import React, { useState, useRef } from 'react';
import Fretboard, { chordNotes, scaleNotes } from 'react-fretboard'
import { scale } from '@tonaljs/scale';
import { add as addScale, entries as scaleEntries } from '@tonaljs/scale-dictionary';
import { entries as chordEntries } from '@tonaljs/chord-dictionary';
import { distance } from "@tonaljs/tonal";
import * as Tonal from 'tonal';
console.log(Tonal);

addScale(['1P', '2m', '4P', '5P', '6m'], 'Ambassel', ['amb']);
// console.log(scaleNotes('C', 'major', true, true))
// console.log(scaleNotes('C', 'major', true, true))
// addScale(['1P', '5P'], 'quinta', ['quinta justa', 'diapente'])

const intervalNoteObject = (tonic, useIvlLabel, useIvlStatus) => note => ({
  note,
  label: useIvlLabel ? distance(tonic, note) : note,
  status: useIvlStatus ? distance(tonic, note) : 'selected',
})

console.log(scale('C amb').notes.map(intervalNoteObject('C', true, true)));

export default function App() {
  const [{ label, selectedNotes }, setState] = useState({});
  const modeRef = useRef();
  const rootRef = useRef();

  return (
    <div>
      <form onSubmit={(e) => {
        e.preventDefault();
        const newState = {};
        const root = rootRef.current.value;
        const [mode,value] = modeRef.current.value.split(':');
        if (mode === 'chord') {
          const chordName = `${root}${value}`;
          newState.selectedNotes = chordNotes(chordName, true, true);
          newState.label = `Chord: ${root} ${value}`;
        } else if (mode === 'scale') {
          newState.label = `Scale: ${root} ${value}`;
          newState.selectedNotes = scale(`${root} ${value}`).notes.map(intervalNoteObject(root, true, true));
        }
        setState(newState);
      }}>
        <select ref={rootRef}>
          <option>A</option>
          <option>Bb</option>
          <option>B</option>
          <option>C</option>
          <option>C#</option>
          <option>D</option>
          <option>D#</option>
          <option>E</option>
          <option>F</option>
          <option>F#</option>
          <option>G</option>
          <option>G#</option>
        </select>
        <select ref={modeRef}>
          <optgroup key="chords" label="Chords">
            {chordEntries().filter(c => Boolean(c.name)).map(chordType => {
              const names = [chordType.name].concat(chordType.aliases);
              const [primaryName, ...aliases] = names;
              const name = `${primaryName} (${aliases.join(', ')})`;
              return (
                <option key={name} value={`chord:${chordType.aliases[0]}`}>{name}</option>
              );
            })}
          </optgroup>
          <optgroup key="scales" label="Scales">
            {scaleEntries().map(scaleType => (
              <option key={scaleType.name} value={`scale:${scaleType.name}`}>{scaleType.name}</option>
            ))}
          </optgroup>
        </select>
        <button type="submit">GO</button>
      </form>
      {label && <h2>{label}</h2>}
      <Fretboard
        nrOfFrets={25}
        tuning={['E1', 'A1', 'D2', 'G2']}
        skinType="strings"
        selectedNotes={selectedNotes}
        theme={{ fontSize: 10 }}
      />
  </div>
  );
}
