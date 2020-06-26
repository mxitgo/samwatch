# samwatch

samwatch is a tool based in nodemon that helps you monitor and transport your changes from your source tree structure to the .sam-build tree structure while developing with AWS SAM. 

samwatch detects changes in your source files, and if the current changed file already exists inside the .sam-build tree structure, it makes a copy of it in the corresponding .sam-build location, keeping your source and .sam-build folders in sync. 

If no corresponding file is available in the .sam-build tree structure, samwatch will issue a "sam build" command. 

This behavior can reduce the use of "sam build" from every time you make a change to only once whenever you need to add new files or folders to the .sam-build folder structure.

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

Next, you can start working with your files, and samwatch will copy the saved changes to .sam-build folder.


# License

MIT [http://rem.mit-license.org](http://rem.mit-license.org)