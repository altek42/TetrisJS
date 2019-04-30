#!/bin/bash

HOST='cba.pl'
USER='raset'
PASSWD='Qwerty123'

ftp -n $HOST <<END_SCRIPT
quote USER $USER
quote PASS $PASSWD
cd raset.cba.pl

lcd ./dist
put *.txt
quit
END_SCRIPT
exit 0