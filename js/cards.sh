#!/bin/sh

cd `dirname $0`
wget 'https://raw.githubusercontent.com/Kooshaba/hearthstone-card-repo/master/cards.js' -O cards.node.js
browserify -r ./cards.node.js:cards > cards.js
rm cards.node.js
