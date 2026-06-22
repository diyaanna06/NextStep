#!/bin/sh

while ! python -c "
import psycopg2
try:
    conn = psycopg2.connect(
        host='db',
        port=5432,
        user='postgres',
        password='password',
        dbname='nextstep_db'
    )
    conn.close()
except:
    raise SystemExit(1)
"
do
    sleep 2
done

alembic upgrade head

python -m uvicorn app.main:app --host 0.0.0.0 --port 8000