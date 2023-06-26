radio.setGroup(3);

radio.onReceivedString(function on_received_string(receivedString: string) {
    basic.showNumber(parseInt(receivedString, 2));
});
