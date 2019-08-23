#!/bin/bash

if type "echo-sd" &> /dev/null; then
  exit 0
fi

echo -ne '\e[32;40;1m\nThis command need "echo-sd"\n\e[m'
echo -ne '\e[33;40;1m'
cat <<EOF

How to install:

$ mkdir -p \$HOME/bin
$ cd \$HOME/bin
$ wget -nv https://raw.githubusercontent.com/fumiyas/home-commands/master/echo-sd
$ chmod +x echo-sd
$ export PATH="\$HOME/bin:\$PATH"
EOF
echo -e '\e[m\n'


exit 127
