#!/usr/bin/env bash

if [ -d ./_site ]; then
	rm -rf ./_site
fi
npx @11ty/eleventy
neocities push --prune ./_site
