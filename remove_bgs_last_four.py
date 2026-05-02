import os
from rembg import remove
from PIL import Image

def main():
    public_dir = "public"
    glasses = [
        'glass_nitro_stout_v2.png',
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
            with open(filepath, 'rb') as f:
                input_data = f.read()
            # remove background
            output_data = remove(input_data)
            
            # save to a new filename with _nobg suffix
            name, ext = os.path.splitext(filename)
            output_filename = f"{name}_nobg.png"
            output_filepath = os.path.join(public_dir, output_filename)
            
            with open(output_filepath, 'wb') as f:
                f.write(output_data)
            print(f"Successfully processed {filename} -> {output_filename}")
        except Exception as e:
            print(f"Error processing {filename}: {e}")

if __name__ == '__main__':
    main()
