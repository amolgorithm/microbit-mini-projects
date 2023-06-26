let num = 0;

input.onGesture(Gesture.Shake, function on_gesture_shake() {    
    num = randint(1, 6);
    basic.showNumber(num);
});
