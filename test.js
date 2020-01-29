class ScientificPitchNote {
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
        this.pitch = pitch;
        this.ordinal = ScientificPitchNote.noteNamesToOrdinal[noteName];
    }

    addHalfSteps = (numberOfHalfSteps) => this._modifyHalfSteps(numberOfHalfSteps, 1);
    subHalfSteps = (numberOfHalfSteps) => this._modifyHalfSteps(numberOfHalfSteps, -1);

    _modifyHalfSteps = (numberOfHalfSteps, direction) => {
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
        const [nextNoteName] = ScientificPitchNote.ordinalToNoteNames(nextOrdinal);

        return new ScientificPitchNote(nextNoteName, nextPitch);
    };

    static noteNameToOrdinal = (noteName) => ScientificPitchNote.noteNamesToOrdinal[noteName];
    static ordinalToNoteNames = (ordinal) => {
        let noteNames = [];
        for (const noteName in ScientificPitchNote.noteNamesToOrdinal) {
            const _ordinal = ScientificPitchNote.noteNamesToOrdinal[noteName];
            if (_ordinal === ordinal) {
                noteNames.push(noteName);
            }
        }

        return noteNames;
    };

    toString = () => `${this.noteName}${this.pitch}`;

    static fromString = (scientificPitchString) => {
        const noteName = scientificPitchString.substring(0, scientificPitchString.length - 1);
        const pitch = Number(scientificPitchString.substring(scientificPitchString.length - 1));

        return new ScientificPitchNote(noteName, pitch);
    }
}

class NoteInterval {
    constructor(halfSteps) {
        this.halfSteps = halfSteps;
    }
}

class Scale {
    constructor(intervals) {
        this.intervals = intervals;
    }

    getInterval = ordinal => this.intervals[ordinal - 2];

    getMode = startOrdinal => {
        if (startOrdinal === 1) {
            return this;
        }

        let intervals = this.intervals.slice(startOrdinal - 1);
        intervals = intervals.concat(this.intervals.slice(0, startOrdinal - 1));

        return new Scale(intervals);
    };
}

const instrument = {
    strings: [
        { root: 'G2' },
        { root: 'D2' },
        { root: 'A1' },
        { root: 'E1' }
    ],
    frets: 24
}

// console.log(strings.map(n => n.root).map(ScientificPitchNote.fromString));
console.log(
    ScientificPitchNote
        .fromString('A2')
        .subHalfSteps(1)
);

let fretLabels = [];
for (let fret = 0; fret < instrument.frets; fret++) {
    fretLabels.push(fret);
}
console.log('|'+fretLabels.map(l => ` ${String(l).padEnd(2, ' ')} `).join('|'))

for (const { root } of instrument.strings) {
    const rootNote = ScientificPitchNote.fromString(root);
    const notes = [];
    for (let fret = 0; fret < instrument.frets; fret++) {
        const note = fret === 0 ? rootNote : rootNote.addHalfSteps(fret);
        notes.push(note);
    }
    console.log('|'+notes.map(n => ' '+n.noteName.toUpperCase().padEnd(3, ' ')).join('|'));
}

const majorScale = new Scale([
    new NoteInterval(2),
    new NoteInterval(2),
    new NoteInterval(1),
    new NoteInterval(2),
    new NoteInterval(2),
    new NoteInterval(2),
    new NoteInterval(1),
    new NoteInterval(1),
]);

class ScaleNotes {
    constructor(rootNote, scale) {
        this.rootNote = rootNote;
        this.scale = scale;
    }

    getNotes = () => {
        const notes = [
            this.rootNote
        ];
        let prevNote = this.rootNote;
        for (let i = 0; i < majorScale.intervals.length - 1; i++) {
            // const intervalName = String(i + 2);
            const interval = majorScale.intervals[i];
            prevNote = prevNote.addHalfSteps(interval.halfSteps);
            notes.push(prevNote);
        }

        return notes;
    };
}

const cMajorScale = new ScaleNotes(
    ScientificPitchNote.fromString('C2'),
    majorScale
)

//console.log(cMajorScale.getNotes().join(' '));

// This is definitely not working
const aeolianMode = majorScale.getMode(6);
// console.log(aeolianMode);
const aAeolianScale = new ScaleNotes(
    ScientificPitchNote.fromString('A3'),
    aeolianMode
)
console.log(aAeolianScale.getNotes().map(n => n.toString()).join(' '));

// We should be able to get a mode from any scale
