let nodemon = require('nodemon');
let fs = require('fs')
let path = require('path');
let __SAMFOLDER = ".sam-build"

nodemon({
  script: 'dummy.js',
  ext: 'js json'
});

nodemon.on('start', function () {

  console.log('Monitoring started \n' );

}).on('quit', function () {
  
    console.log('Monitoring started has quit \n');
  
    process.exit();

}).on('restart', function (files) {

  var appDir = path.dirname(require.main.filename)

  files.forEach((sFile)=>{

    try {

        /// Search for file in .sam-build folder

        var sSamFile = path.join(__SAMFOLDER, path.dirname(sFile).replace(appDir, ""), path.basename(sFile));

        if (fs.existsSync(sSamFile)) {

            fs.copyFile(sFile, sSamFile, (err) => {
                if (err) throw err;
            });

            console.log(": File copy completed \n");

        }else{
            throw `File: ${sSamFile} does not exist in sam-build directory`
        }


      } catch(err) {
        
        console.error(`Error found in script execution, running fallback action, error:  ${err}  \n`);

        console.log("Running sam build");

    }


  });


});