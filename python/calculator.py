# Copyright (C) Amolgorithm (Amol S.)

# On the start of the program, all global variables in program are initialized at zero.
resultNum = 0 #the answer variable
inputNumA = 0 #first number input (from button A)
inputNumB = 0 #second number input (from button B)
operationIndex = 0 #tells which operation is being applied on inputNumA and inputNumB



def on_button_pressed_a():
    global inputNumA
    
    inputNumA += 1 #Increments by 1 each time button A is pressed.
    basic.show_number(inputNumA) #Displays the current accumalated value of inputNumA on the pin screen.
    
input.on_button_pressed(Button.A, on_button_pressed_a) #When Button A is pressed, the function on_button_pressed_a is called.


def on_button_pressed_b():
    global inputNumB
    
    inputNumB += 1 #Increments by 1 each time button B is pressed.
    basic.show_number(inputNumB) #Displays the current accumalated value of inputNumA on the pin screen.
    
input.on_button_pressed(Button.B, on_button_pressed_b) #When Button B is pressed, the function on_button_pressed_b is called.


def on_button_pressed_ab():
    global resultNum, inputNumA, inputNumB, operationIndex
    
    if operationIndex == 0: #applies additon
        resultNum = inputNumA + inputNumB
    elif operationIndex == 1: #applies subtraction
        resultNum = inputNumA - inputNumB
    elif operationIndex == 2: #applies multiplication
        resultNum = inputNumA * inputNumB
    elif operationIndex == 3: #applies division
        resultNum = inputNumA / inputNumB
    else: #applies exponents
        resultNum = inputNumA ** inputNumB
        
    basic.show_number(resultNum) #Displays the final answer
    
    # Resets global variables so that a calculation can be done again
    inputNumA = 0
    inputNumB = 0
    operationIndex = 0
    
#When both buttons A and B are pressed simultaneously, the operation is applied on the input numbers and the resulting value is displayed.
input.on_button_pressed(Button.AB, on_button_pressed_ab)


def on_gesture_shake():
    global operationIndex
    
    #This if else statement is done so that operationIndex can loop from 0 to 4.
    if operationIndex < 4:
        operationIndex += 1
    else:
        operationIndex = 0 #If the current chosen operation was the last (exponent), the chosen operation is again selected as addition.
        
input.on_gesture(Gesture.SHAKE, on_gesture_shake) #When the microbit is shaken, the user can change the arithmetic operation.
