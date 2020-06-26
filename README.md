<p align="center">
  <img src="https://user-images.githubusercontent.com/13700/35731649-652807e8-080e-11e8-88fd-1b2f6d553b2d.png" alt="Nodemon Logo">
</p>

# samwatch

samwatch is a tool based in nodemon that helps you monitor and transport your changes from your source directory to the .sam-build directory while developing with AWS SAM. 

It basically detects changes in your files and if the current file is already inside .sam-build it makes a copy of it. If no file is found, meaning that that particular file or folder haven't been created in the .sam-build folder, it runs sam build to create the file structure. Normally, this would only happen once as opossed to run sam build everytime you make a change in your lambda and you want to see it reflected in your running sam local start-api server.

# Installation

Either through cloning with git or by using [npm](http://npmjs.org) (the recommended way):

```bash
npm install samwatch --save
```

# Usage

Go to the root of your development and run:

```bash
npm start
```

This will start samwatch. 

Next, you can start working with your files and samwatch will copy the saved changes to .sam-build folder.


# License

MIT [http://rem.mit-license.org](http://rem.mit-license.org)
