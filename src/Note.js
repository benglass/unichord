export class Note {
    static noteNamesToOrdinal = {
        'A': 1,
        'A#': 2,
        'Bb': 2,
        'B': 3,
        'C': 4,
        'C#': 5,
        'Db': 5,
        'D': 6,
        'D#': 7,
        'Eb': 7,
        'E': 8,
        'F': 9,
        'F#': 10,
        'Gb': 10,
        'G': 11,
        'G#': 12,
        'Ab': 12,
    };

    constructor(noteName, pitch) {
        this.noteName = noteName;
        this.pitch = Number(pitch);
        this.ordinal = Note.noteNamesToOrdinal[noteName];
    }

    add = (interval) => this._modifyInterval(interval, 1);
    sub = (interval) => this._modifyInterval(interval, -1);

    _modifyInterval = (interval, direction) => {
        const numberOfHalfSteps = interval.halfSteps;

        // It makes consumers lives easier to support Interval(0) being the root note
        if (numberOfHalfSteps === 0) {
            return this;
        }

        let nextOrdinal = this.ordinal;
        let nextPitch = this.pitch;
        const lastOrdinalBeforePitchChange = direction === 1 ? 12 : 1;
        const ordinalAfterPitchChange = lastOrdinalBeforePitchChange === 12 ? 1 : 12;
        for (let i = 1; i <= numberOfHalfSteps; i++) {
            // If we are on the last note, bump the pitch by one and wrap to the start
            if (nextOrdinal === lastOrdinalBeforePitchChange) {
                nextOrdinal = ordinalAfterPitchChange;
                nextPitch = nextPitch + direction; // this is subtraction if we are moving in reverse
            } else {
                nextOrdinal = nextOrdinal + direction; // this is subtraction if we are moving in reverse
            }
        }

        // Just use the first one, later on we might prefer to use a more commonly used noteName
        const [nextNoteName] = Note.ordinalToNoteNames(nextOrdinal);

        return new Note(nextNoteName, nextPitch);
    };

    static noteNameToOrdinal = (noteName) => Note.noteNamesToOrdinal[noteName];
    static ordinalToNoteNames = (ordinal) => {
        let noteNames = [];
        for (const noteName in Note.noteNamesToOrdinal) {
            const _ordinal = Note.noteNamesToOrdinal[noteName];
            if (_ordinal === ordinal) {
                noteNames.push(noteName);
            }
        }

        return noteNames;
    };

    valueOf = () => `${this.noteName}${this.pitch}`;
    toString = () => `${this.noteName}${this.pitch}`;

    static fromScientificPitch = (scientificPitch) => {
        const noteName = scientificPitch.substring(0, scientificPitch.length - 1).toUpperCase();
        const pitch = Number(scientificPitch.substring(scientificPitch.length - 1));

        return new Note(noteName, pitch);
    }
}
