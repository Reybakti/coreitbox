#!/bin/bash

mkdir -p backups

docker exec coreitbox-postgres \
pg_dump -U postgres coreitbox \
> backups/coreitbox_$(date +%F_%H-%M-%S).sql

echo "Backup completed"