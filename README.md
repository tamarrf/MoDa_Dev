# A2S Netlogo Docker & Source Code

## Front End Documentation

https://github.com/tamarrf/MoDa_Dev/tree/master/src/web-application

## Installation

You will need to have recent versions of docker (w/ docker compose) installed. Run the following in the project root to get started

	cp sample.env .env
	docker compose up --build 

To run and build in the background:

	docker compose up -d --build 

To run without building

	docker compose up -d 

To stop

	docker compose down

## Suppressing Netlogo

Netlogo is resource intensive and takes a while to spin up (I've seen 10-20m startup times). To run just craft and the web app:

	docker compose up --build webserver

## Building the plugin to dev
	cd {your-project-root-folder}/utils/plugin-upload
	cp config.json my.config.json #on first time only

Make sure that you have updated my.config.json with your Netlogo private key for dev and that "netlogo" is an ssh shortcut to this server configured in .ssh/config

	ssh netlogo #on first time only to confim this shortcut works
	exit #on first time only to quit the ssh session
	npm install  #on first time only
	node index.js

## Notes for getting set up with our migrations tool

Add the new key-value pairs from the sample.env file to your .env file (MIGRATION_ASSET_URL and the AWS stuff).

You will need to do a complete reset of the environment, which will destroy any local data that you have currently.

	cd {your-project-root-folder}/docker
	./reset.sh

Note that this will docker compose down, destroy all local data, and rebuild and restart ALL services and move everything to the background. You may want to follow the logs in the Docker client dashboard to confirm that everything goes smoothly.

There are now four buttons available from the Netlogo Content Administrator tab
1. Create JSON Migrations Only: This is primarily used for devs who need to sync locally updated content. We should still use Migration Assistant for schema updates.
2. Create Migration Asset Package: This is likely to be used by devs for debugging and potentially for supporting different content promotion workflows
3. Create & Upload Migration Asset Package: This will push a copy of the migrated content and assets to Amazon S3, and make it immediately available to all environments that are linked to the current stage. (e.g., local devs and server dev)
4. Import Remote Migration Package: Select a migration (most recent at the top) to apply to the active environment. This will apply content edits/creation along with associated assets. Note that it will overwrite existing entries with the incoming content, so you want to make sure that there are no potential conflicts before applying a migration.

## Understanding the basics of our FV Docker CMS schema management
1. When docker starts for the first time or after a hard reset, it uses the seed database at /docker/build/craftcms-seeds/mysql/database.sql as a starting point
2. The install script then applies the schema instructions at src/craft/schemas/init.json (these are exported from the included Architect plugin)
3. It will then apply any and all migrations that have been authored using Craft's migration architecture. These are stored in src/craft/migrations and src/craft-plugin/fablevision/netlogo/src/migrations
4. Finally, it runs all feeds queued for the FeedMe plugin
	a. These feeds are defined in the database seed
	b. These feeds all pull from the src/craft-plugin/fablevision/netlogo/src/migrations-json/current.json file

### How to create a content migration during development
1. Make all content/asset changes locally
2. Click the "Create JSON Migration" button on the Netlogo Administrator
3. Commit and push changes from your local to repository to our dev repository

Note that this push will include any newly uploaded assets as well as the "current.json" file that includes all of your local content.

### How to create a change to Craft's schema (e.g., adding a new field to a page, adding an entire new section etc)
This is a little more involved at the moment (we plan to automate most of this), but the basic idea is that we need to prep the build to recreate this new schema on Docker launch so that all devs can have access to it immediately.
1. Create either an Architect export (preferred but more involved) or a PHP migration using the Migration assistant (easier, but less reliable) that captures all schema changes.
2. If you chose Architect, you will need to carefully insert your changes into the existing src/craft/schemas/init.json file. The Migration Assistant will put the php files where they belong.
3. Update the Exporter service at src/craft-plugin/fablevision/netlogo/src/services/Exporter.php to include your newly created content in JSON exports. Use the existing code there for reference.
4. Confirm that your code behaves as expected by clicking the "Create JSON Migration" button on the Netlogo Administrator, and reviewing the output at src/craft-plugin/fablevision/netlogo/src/migrations-json/current.json
5. Create a new feed in the FeedMe plugin in the CraftCMS admin panel. We recommend duplicating and modifying an existing feed. Be sure to use the "slug" value for uniqueness testing.
6. Run the feed to confirm error-free execution.
7. Log into your database and copy the created feed as a SQL insert (right click on the newest row in the feedme_feeds table, and select copy as SQL insert).
8. Paste the SQL into the feedme_feeds table in the /docker/build/craftcms-seeds/mysql/database.sql seed. (Careful with the commas as semicolons)
9. Add the new feed id to the end of the ./craft feed-me/feeds/queue line in docker/build/scripts/install.sh
10. Back up your database, run a hard reset ( cd docker && ./reset.sh ), and confirm that the launched instance contains your new schema and content.

And in 10 easy steps, you're done!

Roadmap: we should be able to automate insertion of the feed into the database and install scripts. However, we will likely need to keep the manual updates to Exporter.php and initial creation of the feed in Craft for a while.

### How to cheat the above if you're doing a lot of work early on in a project's life cycle.
If you're working alone and making a lot of content / schema changes that you know will be permanent, you can instead update the database seed itself.
Note that this is not advised for work on a released product where schema changes need to be applied incrementally.
1. Make whatever changes you need to in schema and content
2. Export the MySQL database (including all creation/content declarations) to a text file
3. Delete all lines EXCEPT FOR THE FIRST TWO in /docker/build/craftcms-seeds/mysql/database.sql
4. Paste your SQL lines below those first two. 
5. Back up your database, run a hard reset ( cd docker && ./reset.sh ), and confirm that the launched instance contains your new schema and content.

### How to restart Galapagos (the NetLogo component)
When the server restarts, if the NetLogo component is unresponsive, you may need to restart Galapagos on port 9000.

	cd ~/fv-galapagos
	sudo forever start index.js
To test:

	curl 127.0.0.1:9000

Also note that there is a separate DNS A record for the galapagos subdomain, and a reverse proxy to port 9000 in `etc/apache2/sites-available`.
