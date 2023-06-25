radio.set_group(3)

def on_received_string(receivedString):
    basic.show_number(int(receivedString, 2))

radio.on_received_string(on_received_string)
