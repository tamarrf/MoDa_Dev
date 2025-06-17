#/bin/bash
cd ~/craft
echo "creating plugin package";
zip -r fablevision.zip templates vendor/fablevision
echo "uploading plugin to dev server"
scp fablevision.zip netlogo:/home/ubuntu

echo "cleaning up";

rm fablevision.zip
exit 0;