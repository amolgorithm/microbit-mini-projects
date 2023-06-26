let binaryCode = "";
radio.setGroup(3);

input.onButtonPressed(Button.A, function on_button_pressed_a() {
    basic.clearScreen();
    basic.pause(100);
    basic.showNumber(0);
    binaryCode += "0";
});

input.onButtonPressed(Button.B, function on_button_pressed_b() {
    basic.clearScreen();
    basic.pause(100);
    basic.showNumber(1);
    binaryCode += "1";
});

input.onButtonPressed(Button.AB, function on_button_pressed_ab() {
    basic.clearScreen();
    basic.showString(binaryCode);
    radio.sendString(binaryCode);
});
