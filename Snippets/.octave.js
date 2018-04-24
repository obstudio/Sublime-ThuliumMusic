const fs = require('fs');

for (const key of [-3, -2, -1, 0, 1, 2, 3]) {
  const filename = `${__dirname}/dist/Oct-${key}.sublime-snippet`;
  const content = `<snippet>
    <content>
  		<![CDATA[Oct(${key})$0]]>
    </content>
    <tabTrigger>o${key}</tabTrigger>
    <scope>meta.subtrack.Thulium</scope>
    <description>Oct(${key})</description>
  </snippet>`;
  fs.writeFileSync(filename, content, {encoding: 'utf8'});
}

