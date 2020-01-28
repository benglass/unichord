import { Chord } from './Chord';
import { Interval } from './Interval';
import { Note } from './Note';
import { assertNotes } from './test-helpers';
import { MAJOR_SCALE } from './Scale';

describe('Chord', () => {

    it('I can create a chord from a set of intervals', () => {
        const chord = new Chord([
            new Interval(Interval.ROOT),
            new Interval(Interval.MAJOR_THIRD),
            new Interval(Interval.PERFECT_FIFTH),
        ]);
        const notes = chord.getNotes(new Note('C', 1));
        assertNotes(notes, [
            new Note('C', 1),
            new Note('E', 1),
            new Note('G', 1)
        ]);
    });

    it('I can create a chord from a scale', () => {
        const chord = Chord.fromScale(
            MAJOR_SCALE,
            [1,3,5,7]
        );
        const notes = chord.getNotes(new Note('C', 1));
        assertNotes(notes, [
            new Note('C', 1),
            new Note('E', 1),
            new Note('G', 1),
            new Note('B', 2)
        ]);
    });

});
