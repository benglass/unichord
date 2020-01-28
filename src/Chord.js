import { Interval } from './Interval';

export class Chord {
    constructor(intervals) {
        this.intervals = intervals;
    }

    getNotes = rootNote => {
        return []
            .concat(
                this.intervals.map(rootNote.add)
            );
    };

    static fromScale = (scale, ordinals) => {
        let intervals = [];

        // If we want to include the root, push it on there
        if (ordinals[0] === 1) {
            intervals.push(new Interval(0));
            ordinals.shift();
        }

        return new Chord(
            intervals.concat(
                ordinals.map(scale.getInterval)
            )
        );
    }
}
