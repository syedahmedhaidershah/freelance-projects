import face_recognition
from PIL import Image

from flask import Flask
app = Flask(__name__)

@app.route("/detect")
def detect():
    image = face_recognition.load_image_file("TestImage//two.jpg")
    face_locations = face_recognition.face_locations(image)
    if len(face_locations) > 1:
        print("More than One Faces Found")
    else:
        if len(face_locations) is 0:
            print("No Faces Found")
        else:
            print("One Face Found")

    return "ok"
 


if __name__ == '__main__':
    app.run(debug=True)