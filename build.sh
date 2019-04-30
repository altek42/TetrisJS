#!/bin/bash

rm ./dist/*.js

#major | minor | patch 
if [ "$#" -eq "0" ]; then
	mode="patch"
else
	mode=$1
fi

npm version $mode
npm run build
