import { Interval } from './Interval';

export class Scale {
    constructor(intervals) {
        // Always add the octave so the consumer doesn't have to
        this.intervals = intervals.concat(new Interval(12));
        // TODO: Consider maybe scales should include the root note
        // this.intervals = [new Interval(0)].intervals.concat(new Interval(12));
    }

    getInterval = ordinal => this.intervals[ordinal - 2];

    getMode = startOrdinal => {
        if (startOrdinal === 1) {
            return this;
        }

        // Start by transforming them into relative intervals (distance between each one)
        const relativeIntervals = this.intervals.reduce(
            (accum, current, currentIndex, allIntervals) => {
                // Don't need to offset the first one
                if (currentIndex === 0) {
                    return accum.concat(current);
                }

                const previous = allIntervals[currentIndex - 1];
                const relativeInterval = current.halfSteps - previous.halfSteps;
                return accum.concat(new Interval(relativeInterval));
            },
            []
        );

        let intervals = relativeIntervals.slice(startOrdinal - 1);
        intervals = intervals.concat(relativeIntervals.slice(0, startOrdinal - 1));

        // Convert them back to absolute intervals
        const absoluteIntervals = intervals.reduce(
            (accum, current, currentIndex) => {
                // Don't need to offset the first one
                if (currentIndex === 0) {
                    return accum.concat(current);
                }

                const previous = accum[currentIndex - 1];
                const relativeInterval = current.halfSteps + previous.halfSteps;
                return accum.concat(new Interval(relativeInterval));
            },
            []
        );

        return new Scale(absoluteIntervals);
    };

    // We should really return a generator here so we can keep going
    getNotes = rootNote => {
        let index = 0;
        let currentRoot = rootNote;
        const iterator = () => ({
            next: () => {
                // The very first time, start with the root note
                const nextNote = index === 0 ? currentRoot : currentRoot.add(this.intervals[index - 1]);
                if (index === (this.intervals.length)) {
                    currentRoot = nextNote;
                    index = 1;
                } else {
                    index++;
                }

                return {
                    value: nextNote,
                    done: false
                };
            }
        });

        let iterableNotes = {
            [Symbol.iterator]: iterator,
            take(count) {
                const notes = [];
                for (const note of iterableNotes) {
                    notes.push(note);
                    if (notes.length === count) {
                        return notes;
                    }
                }
            }
        };

        return iterableNotes;
    };
}

export const MAJOR_SCALE = new Scale([
    new Interval(Interval.SECOND),
    new Interval(Interval.MAJOR_THIRD),
    new Interval(Interval.PERFECT_FOURTH),
    new Interval(Interval.PERFECT_FIFTH),
    new Interval(Interval.MAJOR_SIXTH),
    new Interval(Interval.MAJOR_SEVENTH),
    new Interval(Interval.MAJOR_SEVENTH),
]);
