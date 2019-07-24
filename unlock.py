import time
from pyfingerprint.pyfingerprint import PyFingerprint
import RPi.GPIO as gpio
import requests

def sendMessage(msg):
    requests.post('http://localhost:9896/fingerprint/message', data={'message': msg})

try:
    f = PyFingerprint('/dev/ttyUSB0', 57600, 0xFFFFFFFF, 0x00000000)
    if ( f.verifyPassword() == False ):
        sendMessage('The given fingerprint sensor password is wrong!')
        raise ValueError('The given fingerprint sensor password is wrong!')
except Exception as e:
    print('Exception message: ' + str(e))
    sendMessage('An unhandled exception occured. Check the system')
    exit(1)

def readFinger():
    while ( f.readImage() == False ):
        pass
    f.convertImage(0x01)
    result = f.searchTemplate()
    positionNumber = result[0]
    if ( positionNumber >= 0 ):
        sendMessage('unlockdoor')
        # lcdcmd(1)
        # print("unlocking door\n...")
        # lcdprint("Finger ALready")
        # lcdcmd(192)
        # lcdprint("   Exists     ")
        time.sleep(2)
        #return
    readFinger()

readFinger()    
# while (True):
#     print("reading fingerprint")
#     readFinger()