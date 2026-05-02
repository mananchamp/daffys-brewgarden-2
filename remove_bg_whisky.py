import os
from rembg import remove
from PIL import Image

def main():
    public_dir = "public"
    filename = "glass_whisky_ale_v2.png"
    filepath = os.path.join(public_dir, filename)
    
    if not os.path.exists(filepath):
        print(f"Error: {filename} not found in public directory. Please save the attached image there first.")
        return
        
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
