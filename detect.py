import face_recognition
from PIL import Image
image = face_recognition.load_image_file("000000004.png")
face_locations = face_recognition.face_locations(image)
if len(face_locations) > 1:
    print("More than One Faces Found")
else:
    if len(face_locations) is 0:
        print("No Faces Found")
    else:
         print("One Face Found")
