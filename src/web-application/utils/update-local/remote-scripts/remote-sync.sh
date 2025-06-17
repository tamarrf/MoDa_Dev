rm -rf output;
mkdir output;
mysqldump --login-path=local fqi-2019 > output/fqi.dump.sql
cp -r /var/www/craft-cms/web/images output/images
cp -r /var/www/craft-cms/web/animations output/animations
zip -r output.zip output