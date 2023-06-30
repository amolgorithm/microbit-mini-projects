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


# When button A is pressed...
def on_button_pressed_a():
    # musicString adds the exclamation mark character to its end.
    global musicString
    musicString += "!"
    musicStringNotes.append(noteIndex) #musicStringNotes appends the current noteIndex value at the part of the song we are currently at.

input.on_button_pressed(Button.A, on_button_pressed_a) 

# When Button B is pressed...
def on_button_pressed_b():
    # musicString adds the period character to its end.
    global musicString
    musicString += "."

    #musicStringNotes appends 0 since, at this position of the song, there is just a rest and not a note.
    musicStringNotes.append(_null)
    
input.on_button_pressed(Button.B, on_button_pressed_b)


# When both buttons A and B are pressed simultaneously...
def on_button_pressed_ab():
    global musicString

    # loops through musicString
    index = 0
    while index <= len(musicString) - 1:
        if musicString.char_at(index) == "!": #if the char in musicString at the current value of index is an exclamation mark...
            music.play(music.tone_playable(keyList[musicStringNotes[index]],
                    music.beat(BeatFraction.HALF)),
                music.PlaybackMode.UNTIL_DONE)
        else:
            music.rest(music.beat(BeatFraction.HALF)) #plays a rest for half a beat
        index += 1 #increments by 1

    #after loop finished, resets musicString to an empty so whole application can be done again
    musicString = ""
    
input.on_button_pressed(Button.AB, on_button_pressed_ab)


# When pin 1 is pressed...
def on_pin_pressed_p1():
    global noteIndex

    if noteIndex < len(keyList) - 1:
        noteIndex += 1
    else:
        noteIndex = 0
        
input.on_pin_pressed(TouchPin.P1, on_pin_pressed_p1)


# When pin 2 is pressed...
def on_pin_pressed_p2():
    global noteIndex
    
    if noteIndex > 0:
        noteIndex -= 1
    else:
        noteIndex = len(keyList) - 1
        
input.on_pin_pressed(TouchPin.P2, on_pin_pressed_p2)


def on_forever():
    # displays current note choice and level
    basic.show_string("" + noteList[noteIndex % 12] + str(Math.floor(noteIndex / 12 + 1)))
    
basic.forever(on_forever)
