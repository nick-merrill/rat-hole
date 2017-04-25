#!/bin/bash

# SECURITY NOTE: This is script is totally not secure. Someone could easily
#   hack the directory structure by substituting odd branch names in the script.

# Script Arguments
BRANCH=$1

# Adjustable Settings
USER=ubuntu
DOMAIN=house.cs164.com
REPO_OWNER=cloudrave
REPO_NAME=rat-hole

# Replace slashes with hyphens, in case of something like "feature/my-feature"
NORMALIZED_BRANCH_NAME=${BRANCH//\//\-}
TRAVIS_REPO_SLUG=${TRAVIS_REPO_SLUG:-"${REPO_OWNER}/${REPO_NAME}"}
DEST_DIR=/var/www/${REPO_NAME}-${NORMALIZED_BRANCH_NAME}

# Create destination directory if it does not yet exist
ssh -o 'StrictHostKeyChecking no' ${USER}@${DOMAIN} \
    "
    sudo mkdir -p ${DEST_DIR}/build &&
    sudo chown -R root:www-data ${DEST_DIR}
    sudo chmod -R 775 ${DEST_DIR}
    "

# Ensure local build directory exists
if [ ! -d "build" ]; then
    >&2 echo "A directory ./build must exist!"
    exit 1
fi

# Sync local build directory to the remote server
rsync -r --links --compress --omit-dir-times --ignore-times --delete \
    -e "ssh -o 'StrictHostKeyChecking no'" \
    build ${USER}@${DOMAIN}:${DEST_DIR}/

HTTP_URL="http://${NORMALIZED_BRANCH_NAME}.x.house.cs164.com"
if [ "$BRANCH" = "master" ]; then
    HTTP_URL="https://house.cs164.com"
elif [ "$BRANCH" = "develop" ]; then
    HTTP_URL="https://develop.house.cs164.com"
fi
MESSAGE="See your rats live at ${HTTP_URL}"

echo -e "\n"
echo "-----------------------------------------------------------------"
echo "${MESSAGE}"
echo "-----------------------------------------------------------------"
echo -e "\n"

# Add message as a comment on this commit at GitHub.
# Only do this if on the Travis CI service.
test ${CI} && test ${TRAVIS} && \
    curl -H "Authorization: token ${GITHUB_ACCESS_TOKEN}" \
    -H "Content-Type: application/json" \
    -X POST \
    -d "{ \"body\": \"From [Travis build](https://travis-ci.com/${TRAVIS_REPO_SLUG}/builds/${TRAVIS_BUILD_ID}) :green_heart: ${MESSAGE}\" }" \
    https://api.github.com/repos/${TRAVIS_REPO_SLUG}/commits/${TRAVIS_COMMIT}/comments
