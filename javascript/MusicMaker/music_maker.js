// Global variables
let index = 0;
let noteIndex = 0;
let musicStringNotes: number[] = [];
let musicString = "";
let keyList: number[] = [
131,
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
988
];
let noteList = [
"C",
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
"B"
];


// Button press event listeners...
input.onButtonPressed(Button.A, function() {
    musicString = "" + musicString + "!";
    musicStringNotes.push(noteIndex);
});

input.onButtonPressed(Button.AB, function() {
    while (index <= musicString.length - 1) {
        if (musicString.charAt(index) == "!") {
            music.play(music.tonePlayable(keyList[musicStringNotes[index]], music.beat(BeatFraction.Half)), music.PlaybackMode.UntilDone);
        } else {
            music.rest(music.beat(BeatFraction.Half));
        }
        index++;
    }
    musicString = "";
});

input.onButtonPressed(Button.B, function() {
    let _null = 0;
    musicString = "" + musicString + ".";
    musicStringNotes.push(_null);
});


// Pin press event listeners...
input.onPinPressed(TouchPin.P2, function() {
    if (noteIndex > 0) {
        noteIndex += 0 - 1;
    } else {
        noteIndex = keyList.length - 1;
    }
});

input.onPinPressed(TouchPin.P1, function() {
    if (noteIndex < keyList.length - 1) {
        noteIndex++;
    } else {
        noteIndex = 0;
    }
});


//forever loop
basic.forever(function() {
    basic.showString("" + noteList[noteIndex % 12] + ("" + Math.floor(noteIndex / 12 + 1)));
});
