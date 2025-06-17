# Netlogo Simulation

- Server: netlogo

- Host Name: 54.160.104.211

- GoGo Board version 16.1.2

- Dev Site: https://admin.a2s.fablevision-dev.com/

- Project Setup: Vue 2.6 with a vuex store. Simulation viewer incorporates Google Blockly imported in as an npm package and NetLogo Web incorporated in as a copy of the [Galapagos repository](https://github.com/NetLogo/Galapagos).

## Notes for development on Windows
For Windows systems, it's best to install Ubuntu WSL, then install the latest version of NodeJS in this subsystem before continuing with the rest of the setup in this documentation in this WSL environment. Also note, the version of NodeJS in apt-get is outdated and won't work (i.e. apt-get install node won't work), you should refer to the official NodeJS documentation for installing NodeJS in Ubuntu.

There's also an environment variable to set in order to ensure the connection with Netlogo works. It should be installed into the .bashrc file to avoid needing to set it with every launch.

Navigating to the WSL folder in Windows isn't immediately intuitive (instead of c:\folder\... it's more like \wsl.localhost\Ubutu\) varies between PCs.

## Project setup (or updating new packages)
```
pnpm install
```

### Compiles and hot-reloads for development
```
pnpm run serve
```

### Compiles app and moves necessary files to the craft-plugin folder
```
pnpm run build
```

## Building Locally vs Docker

When the build is complete, running the app in  (via `docker compose up --build`) should reflect your recent changes. Rebuilding the app via `pnpm run build` and refreshing the site (`http://localhost`) should show new changes. You do not need to rebuild the project.

Note: Using `pnpm run serve` will use data `src/web-application/src/data/taskContent/taskDescriptions.json`
Docker will use the data at `localhost/admin` (craft cms) 

## Test before Publishing

To setup Docker environment follow instructions [here](https://gitlab.com/fablevision/columbia/netlogo-docker-environment/-/blob/main/README.md).

## Pushing to the Server (code updates only)

Zip your local src/craft-plugin directory
```
zip craft-plugin
```
Copy this zip file up to ubuntu's home directory on the server. Replace "netlogo" with whatever you've named the server in your .ssh/config file.
```
scp craft-plugin.zip netlogo:/home/ubuntu
```
SSH to the server. Unzip the craft-plugin.zip file you just copied here.
```
unzip craft-plugin.zip
```
CD to the following location. Archive the previous netlogo directory. Copy in the new version. Change the permissions.
```
cd /var/www/craft-cms/vendor/fablevision/
sudo rm -rf netlogo.archive
sudo mv netlogo/ netlogo.archive
sudo mv ~/craft-plugin/fablevision/netlogo .
sudo chown -R www-data:www-data netlogo
```
Also: remove craft-plugin and craft-plugin.zip from ubuntu's home directory.
NOTE: consider changing ownership to ubuntu:www-data instead (so people can FTP file changes).

## Gogo Board Specifications

The Gogo Board Team has provided sample code via this [GitHub repo](https://github.com/LILCMU/gogo-api-demo). Our product uses the WebHID API and can be found in the `feature/webhid` branch.

A live demo of the team's site is available at https://lilcmu.github.io/gogo-api-demo/gogoapi.

Additional documentation for custom protocols on the board can be found [here](https://docs.google.com/spreadsheets/d/1CAfjpUdyYPqjVIPBuzxWlWMIDCX9ud6ybqAj8qMgy4E/edit?usp=sharing).

## Twig Templates and Usage

Raw twig files are used to render all views on the site excluding the simulation with NetLogo views. They can be found in `src/web-application/twigs`. When the project gets built via `pnpm build` it copies all relavant twigs using the `syncTwig.js` script to the `craft-plugin` folder which is what gets copied to the server. The script copies over all relavant dynamic bundles from Vue that would normally get added to `index.html`.

## Blockly Library Setup

This project uses [Google Blockly](https://developers.google.com/blockly) to create the drag and drop environment for users' workspace. This project uses a [custom generator](https://developers.google.com/blockly/guides/create-custom-blocks/generating-code) to convert the Blockly blocks to NetLogo code that then gets incorporated into the base code, which is modified via craft, and passed to NetLogo Web to render the simulation.

Each task incorporates its own custom Blockly Library by name through craft, but libraries are defined in `src/web-application/src/data/blocklyLibraries/`.

Block styling is defined in `src/web-application/src/data/blockConfig/`.

## Backend APIs

[APIs](https://gitlab.com/fablevision/columbia/netlogo-docker-environment/-/blob/main/src/craft-plugin/fablevision/netlogo/src/assetbundles/simulation/js/script.js) for interacting with the backend can be found at `src/craft-plugin/fablevision/src/assetbundles/simulation/js/script.js`.

`refreshStudentProjects`, `organizeData`, `fillTableGallery`, and `favoriteRow` are used to help generate dashboard views for teacher accounts. These are used to create and filter student rows in the project view for teachers. 

`launchClassModal`, `closeClassModal`, `assignJourneyToAllStudents`, `deleteAssignmentForAllStudents`, `updateAssignment`, `deleteAssigment`, `getAssignments` are used for teacher accounts to manage assigning units to classes. 

`getStudentInfo`, `getStudentWithInfo`, `getAllStudentInfo` are used to retrieve various fields in teacher views to render different student account information.

`saveEvent`, `saveChartData`, `loadProgress`, `saveProgress`, and `deleteModel` are used by the front end to log specific events and track progress when the user interacts with different elements. 

`favorite`, `unfavorite`, and `getFavorites` are functions that add, remove, and view favorites from the dashboard view. 

`log` is used by the client to log any uncategorized events in the front end.

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

## Other dev notes

There is part of the build step to js-beautify `gogoBoardComponent~gogoChart.bundle.js`. This is because for some reason, ever since upgrading Highcharts from v9 -> v11, the minified version of this file doesn't play nicely with Twig.