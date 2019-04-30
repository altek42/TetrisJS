#!/bin/bash

rm ./dist/*.js

#major | minor | patch 
if [ "$#" -eq "0" ]; then
	mode="patch"
else
	mode=$1
fi

npm run build
git add -A
git commit -m "Build"

npm version $mode
