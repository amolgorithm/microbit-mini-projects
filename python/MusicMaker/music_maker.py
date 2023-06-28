# Global variables
_null = 0
musicString = ""
noteIndex = 0
musicStringNotes: List[number] = []
keyList: List[number] = [131,
    139,
    147,
    156,
    165,
    175,
    185,
    196,
    208,
    220,
    233,
    247,
    262,
    277,
    294,
    311,
    330,
    349,
    370,
    392,
    415,
    440,
    466,
    494,
    523,
    554,
    587,
    622,
    659,
    698,
    740,
    784,
    831,
    880,
    932,
    988]
noteList = ["C",
    "C#",
    "D",
    "D#",
    "E",
    "F",
    "F#",
    "G",
    "G#",
    "A",
    "A#",
    "B"]


def on_button_pressed_a():
    global musicString
    musicString += "!"
    musicStringNotes.append(noteIndex)
    
input.on_button_pressed(Button.A, on_button_pressed_a)


def on_button_pressed_ab():
    global musicString
    
    index = 0
    while index <= len(musicString) - 1:
        if musicString.char_at(index) == "!":
            music.play(music.tone_playable(keyList[musicStringNotes[index]],
                    music.beat(BeatFraction.HALF)),
                music.PlaybackMode.UNTIL_DONE)
        else:
            music.rest(music.beat(BeatFraction.HALF))
        index += 1
    musicString = ""
    
input.on_button_pressed(Button.AB, on_button_pressed_ab)


def on_button_pressed_b():
    global musicString
    musicString += "."
    musicStringNotes.append(_null)
    
input.on_button_pressed(Button.B, on_button_pressed_b)


def on_pin_pressed_p1():
    global noteIndex
    
    if noteIndex < len(keyList) - 1:
        noteIndex += 1
    else:
        noteIndex = 0
        
input.on_pin_pressed(TouchPin.P1, on_pin_pressed_p1)


def on_pin_pressed_p2():
    global noteIndex
    
    if noteIndex > 0:
        noteIndex -= 1
    else:
        noteIndex = len(keyList) - 1
        
input.on_pin_pressed(TouchPin.P2, on_pin_pressed_p2)


def on_forever():
    basic.show_string("" + noteList[noteIndex % 12] + str(Math.floor(noteIndex / 12 + 1)))
    
basic.forever(on_forever)
