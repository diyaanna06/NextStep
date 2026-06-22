#!/bin/sh

while ! python -c "
import psycopg2
from app.core.config import DATABASE_URL

try:
    conn = psycopg2.connect(DATABASE_URL)
    conn.close()
except:
    raise SystemExit(1)
"
do
    sleep 2
done

alembic upgrade head

python -m uvicorn app.main:app --host 0.0.0.0 --port ${PORT:-8000}