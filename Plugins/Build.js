const fs = require('fs');
const path = require('path');
const process = require('process');

try {

  function unimap(array, mapspec) {
    const result = [].concat(...array.map(mapspec));
    result.sort((inst1, inst2) => InstList.indexOf(inst1) - InstList.indexOf(inst2));
    for (let i = result.length - 1; i > 0; i--) {
      if (result[i] == result[i - 1]) {
        result.splice(i, 1);
      }
    }
    return result;
  }

  const tm = require('./Config.json');
  if (!tm.Kernel) throw 'Cannot find Thulium kernel.';
  
  const StartTime = Date.now();
  const KernelPath = path.join(tm.Kernel + '/Library');
  const Thulium = require(KernelPath + '/Thulium');
  const InstList = [].concat(
    Object.keys(require(KernelPath + '/Config/Instrument.json')),
    Object.keys(require(KernelPath + '/Config/Percussion.json'))
  );

  const input = process.argv.slice(2);
  const result = new Thulium(input[0]);
  const EndTime = Date.now();

  const output = `\
  Finished in ${EndTime - StartTime}ms.
  ${result.Errors.length} error(s), ${result.Warnings.length} warning(s).

  - Title: ${result.Comment.map(line => `${
    line.includes(':') ? `
    - ` : ``}${line.trim()}`
    ).join('')}

  - Instruments: ${unimap(result.Sections, sect => {
    return unimap(sect.Tracks, track => {
      return unimap(track.Instruments, inst => inst.Name);
    });
  }).join(', ')}
  ${result.Sections.map(sect => `
  - Section: ${sect.Comment.length > 0 ? `
    - Name: ${sect.Comment[0].match(/-*(.*([^\-]))-*/)[1].trim()}` : ``}
    - Tracks: ${sect.Tracks.filter(track => track.Play).length}`
  ).join('\n')}\
  ${result.Errors.length > 0 ? `
  - Errors: ${result.Errors}` : ``}\
  ${result.Warnings.length > 0 ? `
  - Warnings: ${result.Warnings}` : ``}
  `;

  console.log(output);

} catch (err) {
  console.log(err);
}
