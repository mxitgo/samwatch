let nodemon = require('nodemon');
let fs = require('fs')
let path = require('path');
let { exec } = require("child_process");
let __SAMFOLDER = ".aws-sam\\build"


function samwatch() {
    
    nodemon({
        script: path.join(__dirname , 'dummy.js'),
        ext: 'js json'
    });

    nodemon.on('start', function () {

        console.log('Monitoring started \n');

    }).on('quit', function () {

        console.log('Monitoring started has quit \n');

        process.exit();

    }).on('restart', function (files) {

        

        files.forEach((sFile) => {

            try {

                var sSamFile = path.join(__SAMFOLDER, path.relative(appDir, path.dirname(sFile)), path.basename(sFile));

                console.log({ sSamFile });

                if (fs.existsSync(sSamFile)) {

                    fs.copyFile(sFile, sSamFile, (err) => {
                        if (err) throw err;
                    });

                    console.log(": File copy completed \n");

                } else {
                    throw `File: ${sSamFile} does not exist in sam-build directory`
                }


            } catch (err) {

                console.error(`Error found in script execution, running fallback action, error:  ${err}  \n`);

                console.log("Running sam build, please wait...");
                exec("sam build", (error, stdout, stderr) => {
                    if (error) {
                        console.log(`error: ${error.message}`);
                        return;
                    }
                    if (stderr) {
                        console.log(`stderr: ${stderr}`);
                        return;
                    }

                    if (stdout) {
                        console.log(`stderr: ${stdout}`);
                        return;
                    }
                    console.log('done!');
                });

            }


        });


    });

}

module.exports = samwatch;