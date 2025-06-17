#/bin/bash
cd ../../src/craft-plugin
echo "creating plugin package";
zip -r fablevision.zip fablevision
echo "uploading plugin to dev server"
scp fablevision.zip netlogo:/home/ubuntu

echo "cleaning up";

rm fablevision.zip
exit 0;