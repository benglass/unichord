import { Scale } from './Scale';
import { Interval } from './Interval';
import assert from 'assert';
import { Note } from './Note';

describe('Scale', () => {

    it('I can create a scale with a set of intervals', () => {
        const scale = new Scale([
            new Interval(2),
            new Interval(4),
            new Interval(5),
            new Interval(7),
            new Interval(9),
            new Interval(11)
        ]);
        assertScale(scale, [2,4,5,7,9,11]);
    });

    it('I can derive a mode from a scale', () => {
        // major
        const scale = new Scale([
            new Interval(2),
            new Interval(4),
            new Interval(5),
            new Interval(7),
            new Interval(9),
            new Interval(11)
        ]);
        // dorian
        assertScale(scale.getMode(2), [2,3,5,7,9,10,12]);
        // phyrigian
        assertScale(scale.getMode(3), [1,3,5,7,8,10,12]);
        // etc.
        // aeolian
        assertScale(scale.getMode(6), [2,3,5,7,8,10,12]);
    });

    it('I can get the notes of a scale starting from a root note', () => {
        // major
        const scale = new Scale([
            new Interval(2),
            new Interval(4),
            new Interval(5),
            new Interval(7),
            new Interval(9),
            new Interval(11)
        ]);

        const noteSequence = scale.getNotes(new Note('C', 1));
        const notes = noteSequence.take(9);
        assertNotes(notes, [
            new Note('C', 1),
            new Note('D', 1),
            new Note('E', 1),
            new Note('F', 1),
            new Note('G', 1),
            new Note('A', 2),
            new Note('B', 2),
            new Note('C', 2),
            new Note('D', 2),
        ]);
    });

});

function assertScale(actual, expectedIntervals) {
    expectedIntervals.forEach((interval, index) => {
        const intervalNumber = index + 2;
        const actualInterval = actual.getInterval(intervalNumber);
        const expectedInterval = new Interval(interval);
        assert.equal(actualInterval.valueOf(), expectedInterval.valueOf(), `Expected interval ${intervalNumber} to be ${expectedInterval.valueOf()} but it was ${actualInterval.valueOf()}`);
    });
}

function assertNotes(actual, expected) {
    assert.deepEqual(
        actual.map(n => n.valueOf()),
        expected.map(n => n.valueOf())
    );
}
