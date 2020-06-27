let nodemon = require('nodemon');
let fs = require('fs')
let path = require('path');
let { exec } = require("child_process");
let __SAMFOLDER = ".aws-sam\\build"
let chalk = require('chalk'); 


var bNotify = false;

function samwatch(args) {

    // N / Notify command would just notify the error


    if (args.length > 2) {



        if ((args[2].toUpperCase().indexOf("N") > -1) || (args[2].toUpperCase().indexOf("NOTIFY") > -1)) {
           bNotify = true;
        }

    }

    nodemon({
        script: path.join(__dirname, 'dummy.js'),
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

                var sSamFile = path.join(process.cwd(), __SAMFOLDER, path.relative(process.cwd(), sFile));

                if (fs.existsSync(sSamFile)) {

                    fs.copyFile(sFile, sSamFile, (err) => {
                        if (err) throw err;
                    });

                    console.log(chalk.green(": File copy completed \n"));

                } else {
                    throw `File: ${sSamFile} does not exist in sam-build directory`
                }


            } catch (err) {



                if (bNotify) {

                    console.error(chalk.red(` Error notification: ${err}  \n`));
                    console.log('Monitoring started \n');

                } else {

                    console.error(chalk.blue(` Error found in script execution, running fallback action, error:  ${err}  \n`));


                    console.log( " Running sam build, please wait...");
                    exec("sam build", (error, stdout, stderr) => {
                        if (error) {
                            console.log(`error: ${error.message}`);
                            return;
                        }
                        if (stderr) {
                            console.log(`${stderr}`);

                            console.log('Monitoring started \n');

                            return;
                        }

                        if (stdout) {
                            console.log(`stdout: ${stdout}`);
                            console.log('Monitoring started \n');
                            return;
                        }
                        
                    });

                }

            }


        });


    });

}

module.exports = samwatch;