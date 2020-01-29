import { Note } from './src/Note';
import { MAJOR_SCALE } from './src/Scale';
import { Chord } from './src/Chord';

// console.log('IONIAN.intervals'.padStart(20, ' '), MAJOR_SCALE.intervals.map(i => i.toString().padEnd(2, ' ')).join('-'));
// console.log('IONIAN.notes'.padStart(20, ' '), MAJOR_SCALE.getNotes(new Note('C', 1)).take(8).join('-'));
const minorScale = MAJOR_SCALE.getMode(2);
// console.log('DORIAN.intervals'.padStart(20, ' '), minorScale.intervals.map(i => i.toString().padEnd(2, ' ')).join('-'));
// console.log('DORIAN.notes'.padStart(20, ' '), minorScale.getNotes(new Note('D', 1)).take(8).join('-'));

// Double 12 is wrong

const minorChord = Chord.fromScale(minorScale, [1,3,5]);
const minorChord2 = Chord.fromScale(MAJOR_SCALE, [2,4,6]);

const rootNote = new Note('C', 1);
const secondNoteInCMajor = MAJOR_SCALE.getNote(rootNote, 2);
console.log(minorChord.getNotes(secondNoteInCMajor).join('-'));
console.log(minorChord2.getNotes(rootNote).join('-'));

