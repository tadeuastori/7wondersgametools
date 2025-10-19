const fs = require('fs-extra');
fs.copy('docs/browser', 'docs', (err) => { 
    if(err) { 
        return console.error(err);
    } else {
        fs.remove('docs/browser', (err) => { if(err) { return console.error(err); } });
        fs.remove('dist', (err) => { if(err) { return console.error(err); } });
    } 
});

