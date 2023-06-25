binary_code = ""
radio.set_group(3)

def on_button_pressed_a():
    global binary_code
    basic.clear_screen()
    basic.pause(100)
    basic.show_number(0)
    binary_code += "0"

input.on_button_pressed(Button.A, on_button_pressed_a)


def on_button_pressed_b():
    global binary_code

    basic.clear_screen()
    basic.pause(100)
    basic.show_number(1)
    binary_code += "1"

input.on_button_pressed(Button.B, on_button_pressed_b)


def on_button_pressed_ab():
    basic.clear_screen()
    basic.show_string(binary_code)
    radio.send_string(binary_code)

input.on_button_pressed(Button.AB, on_button_pressed_ab)
