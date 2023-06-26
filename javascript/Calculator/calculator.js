//  Copyright (C) Amolgorithm (Amol S.)

//  On the start of the program, all global variables in program are initialized at zero.
// the answer variable
let resultNum = 0;

// first number input (from button A)
let inputNumA = 0;

// second number input (from button B)
let inputNumB = 0;

// tells which operation is being applied on inputNumA and inputNumB
let operationIndex = 0;


// When Button A is pressed...
input.onButtonPressed(Button.A, function on_button_pressed_a() {
    
    inputNumA += 1; // Increments by 1 each time button A is pressed.
    basic.showNumber(inputNumA); // Displays the current accumalated value of inputNumA on the pin screen.
});


// When Button B is pressed...
input.onButtonPressed(Button.B, function on_button_pressed_b() {
    
    inputNumB += 1; // Increments by 1
    basic.showNumber(inputNumB); // Displays the current accumalated value of inputNumB on the pin screen.
});


// When both buttons A and B are pressed simultaneously, the operation is applied on the input numbers and the resulting value is displayed.
input.onButtonPressed(Button.AB, function on_button_pressed_ab() {
    
    if (operationIndex == 0) {
        // applies additon
        resultNum = inputNumA + inputNumB;
    } else if (operationIndex == 1) {
        // applies subtraction
        resultNum = inputNumA - inputNumB;
    } else if (operationIndex == 2) {
        // applies multiplication
        resultNum = inputNumA * inputNumB;
    } else if (operationIndex == 3) {
        // applies division
        resultNum = inputNumA / inputNumB;
    } else {
        // applies exponents
        resultNum = inputNumA ** inputNumB;
    }
    
    // Displays the final answer
    basic.showNumber(resultNum);
    
    // Resets global variables so that a calculation can be done again
    inputNumA = 0;
    inputNumB = 0;
    operationIndex = 0;
});


// If the current chosen operation was the last (exponent), the chosen operation is again selected as addition.
input.onGesture(Gesture.Shake, function on_gesture_shake() {
    
    // This if else statement is done so that operationIndex can loop from 0 to 4.
    if (operationIndex < 4) {
        operationIndex += 1;
    } else {
        operationIndex = 0;
    }
    
});
