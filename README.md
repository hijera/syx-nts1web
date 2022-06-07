# syx-nts1web
 Syx from VST plugin to Ntsweb

Converter for *.syx files from https://korg-nts-1-editor-soundbank.jimdofree.com/ to nts-1 web patch (https://nts-web.oscarrc.me/)

# How to use
```
node ./index.js sysex_files...
```

If you will make one-file executable (or download from Releases section), you could just move *.syx files to the executable.

# Make single-file executable
it's ready to make a single file executable, using pkg.
```
npm i pkg
pkg .
```
Compiled app works only with template.json in root folder.
