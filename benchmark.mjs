/**
 * benchmark.mjs — Puppeteer-based performance benchmark for Daffy's Brewgarden
 *
 * Measures:  FCP, LCP, CLS, TTFB, Total Load Time, DOM Content Loaded,
 *            Total Resources, Page Size, JS Heap Usage
 *
 * Usage:
 *   1. Start your dev server first:  npm run dev
 *   2. Run:  node benchmark.mjs
 *   3. (Optional) Pass a custom URL:  node benchmark.mjs http://localhost:3000/some-page
 */

import puppeteer from "puppeteer";

const TARGET_URL = process.argv[2] || "http://localhost:3000";
const RUNS = 3; // average over N runs for stability

// ── helpers ──────────────────────────────────────────────────────────────────

function median(arr) {
  const s = [...arr].sort((a, b) => a - b);
  const mid = Math.floor(s.length / 2);
  return s.length % 2 ? s[mid] : (s[mid - 1] + s[mid]) / 2;
}

function fmt(ms) {
  if (ms === null || ms === undefined || isNaN(ms)) return "N/A";
  return ms < 1000 ? `${ms.toFixed(1)} ms` : `${(ms / 1000).toFixed(2)} s`;
}

function fmtBytes(bytes) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

function grade(metric, value) {
  const thresholds = {
    FCP:  { good: 1800, poor: 3000 },
    LCP:  { good: 2500, poor: 4000 },
    CLS:  { good: 0.1,  poor: 0.25 },
    TTFB: { good: 800,  poor: 1800 },
  };
  const t = thresholds[metric];
  if (!t || value === null || value === undefined || isNaN(value)) return "";
  if (value <= t.good) return "🟢 Good";
  if (value <= t.poor) return "🟡 Needs Improvement";
  return "🔴 Poor";
}

// ── single run ───────────────────────────────────────────────────────────────

async function runBenchmark(browser) {
  const page = await browser.newPage();

  // Enable performance tracking
  await page.setCacheEnabled(false);
  const client = await page.createCDPSession();
  await client.send("Performance.enable");

  // Track resource loading
  let totalResources = 0;
  let totalBytes = 0;
  const resourceBreakdown = { scripts: 0, styles: 0, images: 0, fonts: 0, other: 0 };

  page.on("response", async (response) => {
    try {
      const headers = response.headers();
      const size = parseInt(headers["content-length"] || "0", 10);
      const url = response.url();
      totalResources++;
      totalBytes += size;

      if (url.match(/\.(js|mjs)(\?|$)/i) || (headers["content-type"] || "").includes("javascript")) {
        resourceBreakdown.scripts++;
      } else if (url.match(/\.css(\?|$)/i) || (headers["content-type"] || "").includes("css")) {
        resourceBreakdown.styles++;
      } else if (url.match(/\.(png|jpg|jpeg|gif|webp|svg|avif|ico)(\?|$)/i)) {
        resourceBreakdown.images++;
      } else if (url.match(/\.(woff2?|ttf|otf|eot)(\?|$)/i)) {
        resourceBreakdown.fonts++;
      } else {
        resourceBreakdown.other++;
      }
    } catch { /* ignore */ }
  });

  // Navigate and wait for full load
  const navStart = Date.now();
  await page.goto(TARGET_URL, { waitUntil: "networkidle0", timeout: 60000 });
  const totalLoadTime = Date.now() - navStart;

  // Wait a bit for CLS to settle (animations, lazy loads, etc.)
  await new Promise((r) => setTimeout(r, 3000));

  // Collect Web Vitals via PerformanceObserver
  const vitals = await page.evaluate(() => {
    return new Promise((resolve) => {
      const result = { fcp: null, lcp: null, cls: 0 };

      // FCP
      const fcpEntry = performance.getEntriesByName("first-contentful-paint")[0];
      if (fcpEntry) result.fcp = fcpEntry.startTime;

      // LCP — grab last entry
      const lcpEntries = performance.getEntriesByType("largest-contentful-paint");
      if (lcpEntries.length) result.lcp = lcpEntries[lcpEntries.length - 1].startTime;

      // CLS — sum layout-shift entries without hadRecentInput
      const clsEntries = performance.getEntriesByType("layout-shift");
      for (const entry of clsEntries) {
        if (!entry.hadRecentInput) result.cls += entry.value;
      }

      // Navigation timing
      const nav = performance.getEntriesByType("navigation")[0];
      if (nav) {
        result.ttfb = nav.responseStart - nav.requestStart;
        result.domContentLoaded = nav.domContentLoadedEventEnd - nav.startTime;
        result.domComplete = nav.domComplete - nav.startTime;
      }

      resolve(result);
    });
  });

  // JS Heap
  const metrics = await page.metrics();
  const jsHeap = metrics.JSHeapUsedSize || 0;

  await page.close();

  return {
    fcp: vitals.fcp,
    lcp: vitals.lcp,
    cls: vitals.cls,
    ttfb: vitals.ttfb,
    domContentLoaded: vitals.domContentLoaded,
    domComplete: vitals.domComplete,
    totalLoadTime,
    totalResources,
    totalBytes,
    resourceBreakdown,
    jsHeap,
  };
}

// ── main ─────────────────────────────────────────────────────────────────────

async function main() {
  console.log(`\n🔎  Benchmarking: ${TARGET_URL}`);
  console.log(`    Runs: ${RUNS}  (taking median)\n`);

  const browser = await puppeteer.launch({
    headless: "new",
    args: ["--no-sandbox", "--disable-setuid-sandbox", "--disable-dev-shm-usage"],
  });

  const results = [];

  for (let i = 1; i <= RUNS; i++) {
    process.stdout.write(`    Run ${i}/${RUNS} … `);
    const r = await runBenchmark(browser);
    console.log(`done  (load ${fmt(r.totalLoadTime)})`);
    results.push(r);
  }

  await browser.close();

  // ── aggregate ────────────────────────────────────────────────────────────

  const med = (key) => median(results.map((r) => r[key]).filter((v) => v != null));
  const last = results[results.length - 1]; // resource breakdown from last run

  const fcp  = med("fcp");
  const lcp  = med("lcp");
  const cls  = med("cls");
  const ttfb = med("ttfb");
  const dcl  = med("domContentLoaded");
  const dc   = med("domComplete");
  const tlt  = med("totalLoadTime");
  const heap = med("jsHeap");

  // ── report ───────────────────────────────────────────────────────────────

  console.log("\n" + "═".repeat(60));
  console.log("  📊  BENCHMARK RESULTS");
  console.log("═".repeat(60));

  console.log("\n  ⏱  Core Web Vitals");
  console.log("  ─────────────────────────────────────────────");
  console.log(`  FCP  (First Contentful Paint)   ${fmt(fcp).padStart(10)}   ${grade("FCP", fcp)}`);
  console.log(`  LCP  (Largest Contentful Paint)  ${fmt(lcp).padStart(10)}   ${grade("LCP", lcp)}`);
  console.log(`  CLS  (Cumulative Layout Shift)   ${(cls ?? 0).toFixed(4).padStart(10)}   ${grade("CLS", cls)}`);
  console.log(`  TTFB (Time to First Byte)        ${fmt(ttfb).padStart(10)}   ${grade("TTFB", ttfb)}`);

  console.log("\n  ⏳  Load Timing");
  console.log("  ─────────────────────────────────────────────");
  console.log(`  DOM Content Loaded               ${fmt(dcl).padStart(10)}`);
  console.log(`  DOM Complete                     ${fmt(dc).padStart(10)}`);
  console.log(`  Total Load Time (networkidle)    ${fmt(tlt).padStart(10)}`);

  console.log("\n  📦  Resources");
  console.log("  ─────────────────────────────────────────────");
  console.log(`  Total Requests                   ${String(last.totalResources).padStart(10)}`);
  console.log(`  Total Transfer Size              ${fmtBytes(last.totalBytes).padStart(10)}`);
  console.log(`  JS Heap Used                     ${fmtBytes(heap).padStart(10)}`);

  console.log("\n  📁  Resource Breakdown");
  console.log("  ─────────────────────────────────────────────");
  const rb = last.resourceBreakdown;
  console.log(`  Scripts                          ${String(rb.scripts).padStart(10)}`);
  console.log(`  Stylesheets                      ${String(rb.styles).padStart(10)}`);
  console.log(`  Images                           ${String(rb.images).padStart(10)}`);
  console.log(`  Fonts                            ${String(rb.fonts).padStart(10)}`);
  console.log(`  Other                            ${String(rb.other).padStart(10)}`);

  console.log("\n" + "═".repeat(60));
  console.log("  🏁  Benchmark complete.\n");
}

main().catch((err) => {
  console.error("❌ Benchmark failed:", err.message);
  process.exit(1);
});
