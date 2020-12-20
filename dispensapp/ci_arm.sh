#!/bin/bash

# Get version
ver=$(node -e "console.log(require('./package.json').version);")
echo "$(tput setaf 6)$(tput setab 7)Start CI version: $ver$(tput sgr 0)"

# Build docker image & tag it
echo "$(tput setaf 6)$(tput setab 7)Building React docker image$(tput sgr 0)"
sudo docker buildx build --platform linux/arm/v7 --tag matteoserina/dispensapp-fe .
sudo docker tag matteoserina/dispensapp-fe:latest matteoserina/dispensapp-fe:v$ver
echo "$(tput setaf 6)$(tput setab 7)Local build completed$(tput sgr 0)"

# Push image to Dockerhub
echo "$(tput setaf 6)$(tput setab 7)Pushing React docker image$(tput sgr 0)"
sudo docker push matteoserina/dispensapp-fe:v$ver
sudo docker push matteoserina/dispensapp-fe:latest
echo "$(tput setaf 6)$(tput setab 7)Image pushed$(tput sgr 0)"