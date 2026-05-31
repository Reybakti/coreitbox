#!/bin/bash

set -e

echo "Building containers..."

docker compose build

echo "Starting containers..."

docker compose up -d

docker compose ps

echo "CoreITBox started successfully"