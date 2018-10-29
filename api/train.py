import face_recognition
import pickle
import os, fnmatch
import numpy as np
# Load face encodings
all_face_encodings={}
all_face_images = {}
fname='dataset_faces.dat'
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
                all_face_images[entry] = face_recognition.load_image_file(entry)
                all_face_encodings[entry] = face_recognition.face_encodings(all_face_images[entry])[0]




# ... etc ...

with open('dataset_faces.dat', 'wb') as f:
    pickle.dump(all_face_encodings, f)