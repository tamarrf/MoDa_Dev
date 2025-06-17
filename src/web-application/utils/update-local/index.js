const ssh = require('ssh2').Client;
const conn = new ssh();
const { exec } = require('child_process');
const config = require('./my.config.json');

//This script downloads remote schema, content and asset changes to the local craft installation
//NOTE BEFORE RUNNING: Make sure that Craft Versions are up to date locally and remotely
//Consider data loss re: recent local migrations (e.g., new database table created locally, with data for testing)

//todo: explore api way to conditionally rebuild the json content after pulling content
//todo: explore command line way to reapply local migrations that dont exist on remote server


(function initialize() {
	config.privateKey = require('fs').readFileSync(config.privateKey);
	conn.on('ready', createRemotePackage).connect(config);
}());


function createRemotePackage () {
	trace("creating remote data and asset package");
	conn.exec("./remote-scripts/update-local.sh", (err, stream) => {
		if (err) throw err;
		stream.on('close', migrateData)
		.on('data', (data) => trace(`stdout: ${data}`))
		.stderr.on('data', (data) => trace(`stderr: ${data}`));
	});
}

function migrateData(code, signal) {
	trace("updating local database and migrating assets");

	exec('./download.sh', (err, stdout, stderr) => {
	  if (err) throw err;
	  cleanup();
	});
}

function cleanup() {
	trace("cleaning up remote server");

	conn.exec("./remote-scripts/cleanup.sh", (err, stream) => {
		if (err) throw err;
		stream
		.on('close', complete)
		.on('data', (data) => trace(`stdout: ${data}`))
		.stderr.on('data', (data) => trace(`stderr: ${data}`));
	});
	
}

function complete() {
	trace("cleanup complete");
	conn.end();
	process.exit();
}

function trace() {
	for(var i = 0, count = arguments.length; i < count; i++){
		console.log(arguments[i]);
	}
}
