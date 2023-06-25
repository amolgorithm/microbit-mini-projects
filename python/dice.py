num = 0

def on_gesture_shake():
    global num
    num = randint(1, 6)
    basic.show_number(num)
    
input.on_gesture(Gesture.SHAKE, on_gesture_shake)
