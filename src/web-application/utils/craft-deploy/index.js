const fs = require("fs-extra");
const config = require("./config.json");
const twig = fs.readFileSync("templates/index.twig","utf8");
const html = fs.readFileSync("../../dist/index.html","utf8"); 
const snippet = html.replace(/^.*?<head>/gim, "");
const output = twig + snippet;

fs.writeFileSync("./index.twig", output, "utf8");
fs.moveSync("./index.twig", `${config["craft-directory"]}/templates/index.twig`, { overwrite: true});
fs.removeSync(`${config["craft-directory"]}/web/css`);
fs.removeSync(`${config["craft-directory"]}/web/fonts`);
fs.removeSync(`${config["craft-directory"]}/web/img`);
fs.removeSync(`${config["craft-directory"]}/web/js`);

fs.copySync("../../dist", `${config["craft-directory"]}/web`, { overwrite: true})
fs.copySync("./templates/.htaccess", `${config["craft-directory"]}/web/.htaccess`, { overwrite: true});
fs.removeSync(`${config["craft-directory"]}/web/index.html`);

function trace() {
	for(let i = 0, count = arguments.length; i < count; i++) {
		console.log(arguments[i]);
	}
}