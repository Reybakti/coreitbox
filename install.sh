#!/bin/bash

set -e

echo "Updating system..."

apt update
apt upgrade -y

echo "Installing Docker..."

curl -fsSL https://get.docker.com | sh

systemctl enable docker
systemctl start docker

docker --version
docker compose version

echo "Installation completed"