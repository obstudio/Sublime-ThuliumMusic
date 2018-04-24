const fs = require('fs');

const TonalityDict = {
  a: 'A', b: 'B', c: 'C', d: 'D', e: 'E', f: 'F', g: 'G', sc: '#C', sf: '#F',
  ba: 'bA', bb: 'bB', bc: 'bC', bd: 'bD', be: 'bE', bg: 'bG',
  sa: '#G', sd: '#D', sg: '#G', bf: 'bF', bbb: 'bbB', bbe: 'bbE'
};

for (const key in TonalityDict) {
  const value = TonalityDict[key];
  const filename = `${__dirname}/dist/Key-${value}.sublime-snippet`;
  const content = `<snippet>
    <content>
  	  <![CDATA[(1=${value})$0]]>
    </content>
    <tabTrigger>k${key}</tabTrigger>
    <scope>meta.subtrack.Thulium</scope>
    <description>(1=${value})</description>
  </snippet>`;
  fs.writeFileSync(filename, content, {encoding: 'utf8'});
}

