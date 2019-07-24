import time
from pyfingerprint.pyfingerprint import PyFingerprint
import RPi.GPIO as gpio
# import socketio

# sio = socketio.Client()

# @sio.event
# def connect():
#     print('connection established')

# @sio.event
# def my_message(data):
#     print('message received with ', data)
#     sio.emit('my response', {'response': 'my response'})

# @sio.event
# def disconnect():
#     print('disconnected from server')

# sio.connect('http://192.168.0.101:9897')

try:
    f = PyFingerprint('/dev/ttyUSB0', 57600, 0xFFFFFFFF, 0x00000000)
    if ( f.verifyPassword() == False ):
        raise ValueError('The given fingerprint sensor password is wrong!')
except Exception as e:
    print('Exception message: ' + str(e))
    exit(1)

def enrollFinger():
    # lcdcmd(1)
    # lcdprint("Enrolling Finger")
    print("Enrolling finger")
    time.sleep(2)
    print('Waiting for finger...')
    # lcdcmd(1)
    # lcdprint("Place Finger")
    print("Place Finger")
    while ( f.readImage() == False ):
        pass
    f.convertImage(0x01)
    result = f.searchTemplate()
    positionNumber = result[0]
    if ( positionNumber >= 0 ):
        print('Template already exists at position #' + str(positionNumber))
        # lcdcmd(1)
        print("Finger ALready exists")
        # lcdprint("Finger ALready")
        # lcdcmd(192)
        # lcdprint("   Exists     ")
        time.sleep(2)
        return
    print('Remove finger...')
    # lcdcmd(1)
    # lcdprint("Remove Finger")
    time.sleep(2)
    print('Waiting for same finger again...')
    # lcdcmd(1)
    # lcdprint("Place Finger")
    # lcdcmd(192)
    # lcdprint("   Again    ")
    print("Place finger again")
    while ( f.readImage() == False ):
        pass
    f.convertImage(0x02)
    if ( f.compareCharacteristics() == 0 ):
        print("Fingers do not match")
        # lcdcmd(1)
        # lcdprint("Finger Did not")
        # lcdcmd(192)
        # lcdprint("   Mactched   ")
        time.sleep(2)
        return
    f.createTemplate()
    positionNumber = f.storeTemplate()
    print('Finger enrolled successfully!')
    # lcdcmd(1)
    # lcdprint("Stored at Pos:")
    # lcdprint(str(positionNumber))
    # lcdcmd(192)
    # lcdprint("successfully")
    print('New template position #' + str(positionNumber))
    time.sleep(2)

def searchFinger():
    try:
        print('Waiting for finger...')
        while( f.readImage() == False ):
            #pass
            time.sleep(.5)
            return
        f.convertImage(0x01)
        result = f.searchTemplate()
        positionNumber = result[0]
        accuracyScore = result[1]
        if positionNumber == -1 :
            print('No match found!')
            # lcdcmd(1)
            # lcdprint("No Match Found")
            time.sleep(2)
            return
        else:
            print('Found template at position #' + str(positionNumber))
            # lcdcmd(1)
            # lcdprint("Found at Pos:")
            # lcdprint(str(positionNumber))
            time.sleep(2)

    except Exception as e:
        print('Operation failed!')
        print('Exception message: ' + str(e))
        exit(1)

# begin()
enrollFinger()