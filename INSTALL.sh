#!/bin/bash

set -e -o pipefail  # Exit on error and handle errors in pipelines

# If binary already exists at .anomie/bin/anomie, exit
if [ -f ./.anomie/bin/anomie ]; then
    echo "anomie is already installed. Please remove the existing installation and try again."
    exit 1
fi

# Check if jq is installed, ask if want to install if not found.
if ! command -v jq &> /dev/null
then
    echo "jq could not be found"
    read -p "Do you want to install jq? [y/n]: " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]
    then
        sudo apt-get install jq -y
    else
        echo "Please install jq and try again."
        exit 1
    fi
fi

DOWNLOAD_LINK="https://api.github.com/repos/anomievision/anomie-cli/releases/latest"
EXTRACT_DIR="./.anomie"

# Ensure the extract directory exists
mkdir -p "$EXTRACT_DIR"

# Download package from GitHub release & extract package
version=$(curl -s "$DOWNLOAD_LINK" | jq -r '.tag_name')
download_url=$(curl -s "$DOWNLOAD_LINK" | jq -r '.assets[] | select(.name | test("anomie-.*-linux.tar.gz")) | .browser_download_url')

curl -sL "$download_url" | tar -xz -C "$EXTRACT_DIR"

# Create a symbolic link
ln -s "$EXTRACT_DIR/bin/anomie" ./anomie

echo "Installation successful. Version: $version"
