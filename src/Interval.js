export class Interval {
    constructor(halfSteps) {
        this.halfSteps = halfSteps;

        // For comparison
        this.valueOf = () => this.halfSteps;

        this.toString = () => String(this.halfSteps);
    }

    static ROOT = 0;
    static FLAT_SECOND = 1;
    static SECOND = 2;
    static MINOR_THIRD = 3;
    static MAJOR_THIRD = 4;
    static PERFECT_FOURTH = 5;
    static FLAT_FIFTH = 6;
    static PERFECT_FIFTH = 7;
    static MINOR_SIXTH = 8;
    static MAJOR_SIXTH = 9;
    static MINOR_SEVENTH = 10;
    static MAJOR_SEVENTH = 11;
    static OCTAVE = 12;
}
