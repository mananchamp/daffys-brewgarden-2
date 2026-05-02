import os
from rembg import remove
from PIL import Image

def main():
    public_dir = "public"
    glasses = [
        'glass_hefeweizen.png',
        'glass_wit_bier.png',
        'glass_lager.png',
        'glass_whisky_ale.png',
        'glass_nitro_stout.png',
        'glass_ipa.png',
        'glass_mead.png',
        'glass_specialty.png'
    ]
    
    for filename in glasses:
        filepath = os.path.join(public_dir, filename)
        if not os.path.exists(filepath):
            print(f"Skipping {filename}, not found")
            continue
            
        print(f"Processing {filename}...")
        try:
            # open image
            input_image = Image.open(filepath)
            # remove background
            output_image = remove(input_image)
            # save
            output_image.save(filepath)
            print(f"Successfully processed {filename}")
        except Exception as e:
            print(f"Error processing {filename}: {e}")

if __name__ == '__main__':
    main()
