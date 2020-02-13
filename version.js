/*
const { gitDescribeSync } = require('git-describe');
const { version } = require('./package.json');
const { resolve, relative } = require('path');
const { writeFileSync } = require('fs-extra');
const gitInfo = gitDescribeSync({
    dirtyMark: '',
    dirtySemver: false,
    customArguments: ['--abbrev=8']
});
const file = resolve(__dirname, 'dist', 'version.json');
writeFileSync(file,
`${JSON.stringify({
    info: version + '-' + gitInfo.hash,
    version: version,
    hash: gitInfo.hash
}, null, 4)}
`, { encoding: 'utf-8' });
console.log(`Generated version file at ${relative(__dirname, file)}`);
*/
