const fs = require("fs-extra");
const twig = fs.readFileSync("src/twigs/index.twig","utf8");
const exampleTwig = fs.readFileSync("src/twigs/examples.twig","utf8");
const projectsTwig = fs.readFileSync("src/twigs/projects.twig","utf8");
const html = fs.readFileSync("../craft-plugin/fablevision/netlogo/src/web-application/index.html","utf8"); 

const linkedFiles = html.substring(
	html.indexOf("<head>") + "<head>".length,
	html.lastIndexOf("</head>")
);
let twigString = twig.toString();
twigString = twigString.replace("VueGoesHere", linkedFiles);
fs.writeFileSync("../craft-plugin/fablevision/netlogo/src/web-application/index.twig", twigString, "utf8");

let exampleTwigString = exampleTwig.toString();
exampleTwigString = exampleTwigString.replace("VueGoesHere", linkedFiles);
fs.writeFileSync("../craft-plugin/fablevision/netlogo/src/web-application/examples.twig", exampleTwigString, "utf8");

let projectsTwigString = projectsTwig.toString();
projectsTwigString = projectsTwigString.replace("VueGoesHere", linkedFiles);
fs.writeFileSync("../craft-plugin/fablevision/netlogo/src/web-application/projects.twig", projectsTwigString, "utf8");
console.log('your index.twig, examples.twig, and projects.twig file has been updated in the craft-plugin directory')


