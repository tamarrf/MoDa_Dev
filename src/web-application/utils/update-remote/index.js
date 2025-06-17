const ssh = require('ssh2').Client;
const conn = new ssh();
const { exec } = require('child_process');
const config = require('./my.config.json');

(function initialize() {
	config.privateKey = require('fs').readFileSync(config.privateKey);
	exec('./upload.sh', (err, stdout, stderr) => {
	  if (err) throw err;
	  updateRemotePlugin();
	});
}());


function updateRemotePlugin () {
	trace("creating remote plugin...");

	conn.on('ready', () => {
		conn.exec("./remote-scripts/update-remote.sh", (err, stream) => {
			if (err) throw err;
			stream.on('close', updateComplete)
			.on('data', (data) => trace(`stdout: ${data}`))
			.stderr.on('data', (data) => trace(`stderr: ${data}`));
		});
	}).connect(config);
	
	
}

function updateComplete() {
	trace("update complete");
	conn.end();
	process.exit();
}

function trace() {
	for(var i = 0, count = arguments.length; i < count; i++){
		console.log(arguments[i]);
	}
}