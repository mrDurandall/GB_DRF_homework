#!/bin/sh
# wait-for-postgres.sh

set -e

host="$1"
shift
cmd="$@"

until PGPASSWORD="qwaszx" psql -h "$host" -d "todos" -U "IvanT" -c '\q'; do
  >&2 echo "Postgres in unavaileble - sleeping"
  sleep 1
done

>&2 echo "Postgres in up - executing command"
exec $cmd