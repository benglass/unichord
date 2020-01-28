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
        return new Chord(
            ordinals.map(scale.getInterval)
        );
    }
}
