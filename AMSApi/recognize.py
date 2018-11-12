import face_recognition
import pickle
from flask import jsonify
import face_recognition
import pickle
import os, fnmatch
import numpy as np
import numpy as np
import json
import io
import base64
from flask_cors import CORS, cross_origin
from flask import Flask, request  # import main Flask class and request object
app = Flask(__name__)  # create the Flask app
CORS(app)
# root route
trainstack = 0
enterStack = True

@app.route("/")
def index():
    return "systemok.200"

# train route

@app.route("/train",  methods=['POST'])
def train():
    global trainstack
    global enterStack
    trainstack += 1
    if enterStack is not False:
        enterStack = False
        while trainstack is not 0:
            trainDataset()
            trainstack -= 1
        enterStack = True

def trainDataset():
    # Load face encodings
    all_face_encodings = {}
    all_face_images = {} 
    fname = 'dataset_faces.dat'
    if os.path.isfile(fname) is True:
        if os.path.getsize(fname) > 0:
            with open(fname, 'rb') as f:
                all_face_encodings = pickle.load(f)
    # Grab the list of names and the list of encodings
    face_names = list(all_face_encodings.keys())
    listOfFiles = os.listdir('.')
    pattern = "*.png"
    for entry in listOfFiles:
        if fnmatch.fnmatch(entry, pattern):
            if entry not in face_names:
                print(entry)
                all_face_images[entry] = face_recognition.load_image_file(
                    entry)
                all_face_encodings[entry] = face_recognition.face_encodings(
                    all_face_images[entry])[0]
    return "success"


@app.route('/test', methods=['POST'])  # GET requests will be blocked
def test():
    req_data = request.get_json()
    # Load face encodings
    with open('dataset_faces.dat', 'rb') as f:
        all_face_encodings = pickle.load(f)
    # Grab the list of names and the list of encodings
    face_names = list(all_face_encodings.keys())
    face_encodings = np.array(list(all_face_encodings.values()))
    # Try comparing an unknown image
    #file ="data:image/jpeg;base64,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"
    file = req_data['file']
    starter = file.find(',')
    image_data = file[starter+1:]
    image_data = bytes(image_data, encoding="ascii")
    unknown_image = face_recognition.load_image_file(
        io.BytesIO(base64.b64decode(image_data)))
    unknown_face = face_recognition.face_encodings(unknown_image)
    result = face_recognition.compare_faces(face_encodings, unknown_face)
    print(type(result))
    # Print the result as a list of names with True/False
    # names_with_result = list(zip(face_names, result))
    dictionary = {}
    dictionary = Convert(zip(face_names, result), dictionary)
    print(str(dictionary))
    return jsonify(str(dictionary))
    # print(names_with_result)


def Convert(tup, di):
    for a, b in tup:
        di.setdefault(a, []).append(b)
    return di
    

if __name__ == '__main__':
    app.run(debug=True, port=5000)  # run app in debug mode on port 5000
