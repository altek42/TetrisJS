#!/bin/bash

HOST='cba.pl'
USER='raset'
PASSWD='Qwerty123'

ftp -n $HOST <<END_SCRIPT
quote USER $USER
quote PASS $PASSWD
binary
prompt

cd raset.cba.pl

lcd ./dist
mput *.*
quit
END_SCRIPT
exit 0