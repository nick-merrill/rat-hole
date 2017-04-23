#!/bin/bash

BRANCH=$1

USER=ubuntu
DOMAIN=house.cs164.com

rsync -avz --delete -e "ssh -o 'StrictHostKeyChecking no'" \
    build ${USER}@${DOMAIN}:/var/www/rat-hole-${BRANCH}/
