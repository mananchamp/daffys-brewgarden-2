"""
Remove background from just the Wit Bier glass image as a test.
Uses rembg with u2net model for clean background removal.
"""
import os
from rembg import remove
from PIL import Image
import io

def main():
    filepath = os.path.join("public", "glass_wit_bier.png")
    
    if not os.path.exists(filepath):
        print(f"File not found: {filepath}")
        return
    
    print(f"Processing {filepath}...")
    print(f"Original file size: {os.path.getsize(filepath)} bytes")
    
    # Read the image
    with open(filepath, 'rb') as f:
        input_data = f.read()
    
    # Remove background using rembg
    output_data = remove(input_data)
    
    # Save as new file first so we can compare
    output_path = os.path.join("public", "glass_wit_bier_nobg.png")
    with open(output_path, 'wb') as f:
        f.write(output_data)
    
    print(f"Saved transparent version to: {output_path}")
    print(f"New file size: {os.path.getsize(output_path)} bytes")
    print("Done! Check glass_wit_bier_nobg.png to verify quality before replacing the original.")

if __name__ == '__main__':
    main()
