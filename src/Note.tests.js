import { Note } from './Note';
import { Interval } from './Interval';
import assert from 'assert';

describe('Note', () => {

    it('I can create a note from a scientific pitch string', () => {
        const actual = Note.fromScientificPitch('c1');
        assertNote(actual, new Note('C', 1));
    });

    it('I can add an interval to get the next note', () => {
        const sut = Note.fromScientificPitch('c1');
        const nextNote = sut.add(new Interval(1));
        assertNote(nextNote, new Note('C#', 1));
    });

    it('I can add an interval that crosses the octave and the pitch increases', () => {
        const sut = Note.fromScientificPitch('c1');
        const nextNote = sut.add(new Interval(9));
        assertNote(nextNote, new Note('A', 2));
    });

    it('I can subtract an interval to get the previous note', () => {
        const sut = Note.fromScientificPitch('c1');
        const prevNote = sut.sub(new Interval(1));
        assertNote(prevNote, new Note('B', 1));
    });

    it('I can subtract an interval that crosses the octave and the pitch decreases', () => {
        const sut = Note.fromScientificPitch('c2');
        const nextNote = sut.sub(new Interval(4));
        assertNote(nextNote, new Note('G#', 1));
    });

});

const assertNote = (actual, expected) => {
    assert.equal(actual.noteName, expected.noteName);
    assert.equal(actual.pitch, expected.pitch);
    assert.equal(actual.ordinal, expected.ordinal);
}
