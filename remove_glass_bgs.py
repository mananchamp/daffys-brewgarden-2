import os
from rembg import remove
from PIL import Image

def main():
    public_dir = "public"
    # List of new glass images to process
    glasses = [
        "glass_whisky_ale_v2.png",
        "glass_nitro_stout_v2.png",
        "glass_mead_v3.png"
    ]
    
    for filename in glasses:
        filepath = os.path.join(public_dir, filename)
        
        if not os.path.exists(filepath):
            print(f"Skipping {filename}: Not found in public directory. (Please save the attached image there first)")
            continue
            
        print(f"Processing {filename} to remove background...")
        try:
            input_image = Image.open(filepath)
            output_image = remove(input_image)
            output_image.save(filepath)
            print(f"Successfully removed background from {filename}!")
        except Exception as e:
            print(f"Error processing {filename}: {e}")

if __name__ == '__main__':
    main()
