const fs = require('fs');

for (const beat of [3, 4, 6]) {
  for (const bar of [4, 8]) {
    const filename = `${__dirname}/dist/Rest-${beat}-${bar}.sublime-snippet`;
    const content = `<snippet>
      <content>
        <![CDATA[${`0${'-'.repeat(beat - 1)}|`.repeat(bar)}\n$0]]>
      </content>
      <tabTrigger>r${beat}${bar}</tabTrigger>
      <scope>meta.subtrack.Thulium</scope>
      <description>Rest(${beat}, ${bar})</description>
    </snippet>`;
    fs.writeFileSync(filename, content, {encoding: 'utf8'});
  }
}

