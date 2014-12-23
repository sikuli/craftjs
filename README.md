#craftjs
---
## Using Git
Collaboration using Git and GitHub. 

### Set Up the Repositories
The following instructions assume the user has

1. A GitHub account
2. Git installed on machine
    - Note to Windows users: during setup, make sure to select "Run Git From Windows Command Prompt"
    - To configure,
```sh
$ git config --global user.name "usernamehere"
$ git config --global user.email youremail@example.com
```
3. Downloaded node.js -- (http://nodejs.org/)
    - On Windows, installation sets up a separate command line for node & npm (search "node.js command prompt"). Use this for all development. Otherwise, manually add it to the path to access from the normal command line. 

##### One-Time Actions 
These only need to be done once:
- Fork craftjs repository on GitHub 
- Clone fork to computer using 
```sh
$ git clone [git-repo-url]
```
- Install dependencies in craftjs using
```sh
$ npm install
```
at the level of both the craftjs and craftjs/www directories.

### Development
##### Pull, Commit, Push
- Always pull before committing for fewer conflicts between master and fork! 
    - see "Keeping Your Fork Up-to-Date"
- If ready to contribute code modifications to master, return to level of craftjs directory, then
```sh
$ git status                            # display unadded paths
$ git add pathname                      # add path, e.g lib/packs/standard/filename
$ git status                            # check if path is added
$ git commit -m "messagehere"           # commit to fork
$ git push                              # add modified fork to GitHub
```
 - Note that the commit message uses single quotes on Linux systems
- Go to GitHub and create pull request from the fork
    - Click the green button in the upper left

##### Keeping Your Fork Up-To-Date
The following is necessary to keep your fork up-to-date with changes in the master. 
- Add remote from original repository into fork
```sh
# This is a one-time action
$ cd locationonmachine/craftjs           
$ git remote add upstream [git-repo-url]    
```
- Fetch all branches of remote into remote tracking branch
```sh
$ git fetch upstream                     
```
- Update fork from original to keep up with changes
```sh
$ git pull upstream master
```

##### Adding Modules
To add new modules from the OpenJSCAD library, 
- Go to craftjs/lib/node_modules/openscad.js 
- Add new modules by following the format starting in line 2731. For instance, to include the chain hull functionality, insert
```sh
chain_hull: chain_hull,
```

---
## Using the Viewer
For ease of use during development and modeling. This is also documented in craftjs/www/README.md .
- Make sure Gulp has been installed globally
```sh
$ npm i -g gulp
```
- Open a terminal. At the level of craftjs/www, 
```sh
$ node app
```
- Open a second terminal. At the level of craftjs/www, 
```sh
$ gulp watch
```

This should open a tab in the web brower that allows users to view and test models. By keeping both terminals open during development, users can instantly see their rendered code, along with error messages (using DevTools) that allow for quicker debugging.

##### Debugging 
If the viewer remains blank, there is probably a bug in the model code. 
- Open Developer tools (or right-click in the window & select "Inspect Element")
- Go to "Console" to see error output

---   
## Contributing

## Release History