import assert from 'assert';
import { Interval } from './Interval';

export function assertScale(actual, expectedIntervals) {
    expectedIntervals.forEach((interval, index) => {
        const intervalNumber = index + 2;
        const actualInterval = actual.getInterval(intervalNumber);
        const expectedInterval = new Interval(interval);
        assert.equal(actualInterval.valueOf(), expectedInterval.valueOf(), `Expected interval ${intervalNumber} to be ${expectedInterval.valueOf()} but it was ${actualInterval.valueOf()}`);
    });
}

export function assertNotes(actual, expected) {
    assert.deepEqual(
        actual.map(n => n.valueOf()),
        expected.map(n => n.valueOf())
    );
}
