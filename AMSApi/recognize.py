import face_recognition
import pickle
from flask import jsonify
from PIL import Image
import face_recognition
import pickle
import os
import fnmatch
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
				#(print)(entry)
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
	file = req_data['file']
	starter = file.find(',')
	image_data = file[starter+1:]
	image_data = bytes(image_data, encoding="ascii")
	unknown_image = face_recognition.load_image_file(
		io.BytesIO(base64.b64decode(image_data)))
	# detecting faces ##############################################
	face_locations = face_recognition.face_locations(unknown_image)
	if len(face_locations) > 1:
		return "{\"error\":true,\"message\":\"Too many faces in the Image\"}"
	else:
		if len(face_locations) is 0:
			return "{\"error\":true,\"message\":\"No faces in the Image\"}"
	################################################################
	unknown_face = face_recognition.face_encodings(unknown_image)
	result = face_recognition.compare_faces(face_encodings, unknown_face)
	#(print)(type(result))
	# Print the result as a list of names with True/False
	# names_with_result = list(zip(face_names, result))
	dictionary = {}
	dictionary = Convert(zip(face_names, result), dictionary)
	#(print)(str(dictionary))
	print(str(dictionary))
	return jsonify(str(dictionary))
	# print(names_with_result)


def Convert(tup, di):
	for a, b in tup:
		di.setdefault(a, []).append(b)
	return di


if __name__ == '__main__':
	app.run(debug=True, port=5000)  # run app in debug mode on port 5000
