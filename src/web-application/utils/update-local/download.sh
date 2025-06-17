#!/usr/bin/env zsh
# run: mysql_config_editor set --login-path=a2s --host=192.168.64.4 --user=root --password
# make sure a "netlogo" alias is defined in your ./ssh/config file
# this script makes an assumption that craft lives here, relative to this file: ../../../netlogo-cms

alias mysql=/usr/local/mysql/bin/mysql
alias mysqladmin=/usr/local/mysql/bin/mysqladmin
alias mysqldump=/usr/local/mysql/bin/mysqldump

echo "Backing up local database to: .backups/local.backup.sql"
mkdir -p .backups
rm -rf .backups/*
mysqldump --login-path=a2s netlogo > .backups/local.backup.sql

echo "Creating temp working directory..."
rm -rf .tmp
mkdir .tmp

echo "Backing up sessions table";
mysql --login-path=a2s netlogo < sessions-backup.sql
mysqldump --login-path=a2s netlogo sessions > .tmp/sessions-backup.sql


echo "Dropping current local database"
mysqladmin --login-path=a2s drop netlogo -f;

echo "Downloading remote database and image paths..."
scp netlogo:/home/ubuntu/output.zip .tmp/output.zip
cd .tmp
echo "Unpacking downloaded content..."
unzip output.zip

echo "Creating new database..."
mysqladmin --login-path=a2s create netlogo
mysql --login-path=a2s netlogo < output/netlogo.dump.sql
#mysql --login-path=a2s netlogo < ../proc.sql
mysql --login-path=a2s netlogo < sessions-backup.sql

echo "Database import complete"
rm -rf ../../../netlogo-cms/web/assets
cp -r output/assets ../../../netlogo-cms/web/assets

cd ../
rm -rf .tmp

echo "Updating recent migrations...";
cd ../../../netlogo-cms
./craft migrate/all -p netlogo

exit 0