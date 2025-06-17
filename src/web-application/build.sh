#!/bin/bash
pnpm build 
cd utils/craft-deploy
echo "running craft deploy...";
node index.js
echo "deployment complete";