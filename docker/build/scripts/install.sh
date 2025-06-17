#!/bin/bash
cd /var/www/craftcms

composer require $1
./craft plugin/install $2
./craft plugin/install aws-s3
./craft plugin/install redactor
./craft plugin/install feed-me
./craft plugin/install architect
./craft plugin/install migrationassistant
./craft architect/import schemas/init.json
./craft migrate/all
#./craft update
#./craft update all -- need to set CRAFT_ALLOW_SUPERUSER and handle licensing for local pro
./craft feed-me/feeds/queue 4,2,3,5,7,8,9,10
chown -R www-data:www-data .
apachectl -DFOREGROUND