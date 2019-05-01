#!/bin/bash

#major | minor | patch 
if [ "$#" -eq "0" ]; then
	mode="patch"
else
	mode=$1
fi
npm version $mode

rm ./dist/*.js

npm run build
git add -A
git commit -m "Build"

