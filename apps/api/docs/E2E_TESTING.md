# E2E Testing Setup with Docker PostgreSQL

## Overview

E2E testy používají vyhrazenou testovací databázi PostgreSQL, která běží v Docker kontejneru na portu **5556**. Tato konfigurace zajišťuje:

- ✅ Izolaci testů od vývojové/produkční databáze
- ✅ Reproducibilní prostředí pro všechny vývojáře
- ✅ Čisté stav DB při každém spuštění testů
- ✅ Snadné zapnutí/vypnutí bez ovlivnění ostatních služeb

## Prerequisites

- Docker a Docker Compose instalované
- Node.js a pnpm
- Spuštěný development environment (pro spuštění API a testů)

## Setup

### 1. Spuštění Test Database

```bash
cd /Users/martinszollos/Sites/vacuum/apps/api

# Spustí PostgreSQL test database na portu 5556
docker compose up -d test-db

# Ověří, že je kontejner spuštěn
docker ps | grep postgres_test_db
```

### 2. Ověření připojení

```bash
# Test připojení k test DB
docker compose exec test-db psql -U postgres -d vacuum_test -c "SELECT 1;"
```
### 3. Spuštění migrací

```bash
# Spustí definované migrace na testovací databázi
POSTGRES_DB_URL=postgresql://postgres:postgres@localhost:5556/vacuum_test pnpm drizzle:migrate
```


## Running E2E Tests

### Spuštění e2e testů

```bash
# Prostě spustí testy (vyžaduje běžící test-db kontejner)
pnpm test:e2e

# Nebo podrobněji
NODE_ENV=test npx jest --config ./test/jest-e2e.json
```

### S watch mody (pro vývoj)

```bash
NODE_ENV=test npx jest --config ./test/jest-e2e.json --watch
```

### Spuštění konkrétního test souboru

```bash
NODE_ENV=test npx jest --config ./test/jest-e2e.json auth.e2e-spec.ts
```

## Environment Variables

Test databáze používá `.env.test` soubor:

```dotenv
POSTGRES_DB_URL=postgresql://postgres:postgres@localhost:5556/vacuum_test
JWT_SECRET=unit-test-secret-123
```

Při spuštění testů se automaticky načte (viz `app.module.ts` a `jest-e2e.json`).

## Database Cleanup

### Ověření stavu test DB

```bash
# Připojit se na test DB a spustit SQL
docker compose exec test-db psql -U postgres -d vacuum_test
```

### Reset databáze (přepustit kontejner)

```bash
# Zastavit a smazat test-db kontejner
docker compose down test-db

# Znovu spustit (vytvoří čistou DB)
docker compose up -d test-db
```

## Troubleshooting

### Port 5556 již používá jiný proces

```bash
# Změnit port v docker-compose.yml (e.g., "5557:5432")
# Pak aktualizovat POSTGRES_DB_URL v .env.test
```

### Chyba: "test-db" kontejner se nespouští

```bash
# Ověřit logs
docker compose logs test-db

# Zkontrolovat, že neniž port zabraný
lsof -i :5556
```

### Testy selžou s "connection refused"

1. Ověřit, že je `docker compose up -d test-db` spuštěno
2. Ověřit POSTGRES_DB_URL v `.env.test`
3. Čekat ~5 sekund na spuštění PostgreSQL po startu kontejneru

## CI/CD Integration

V CI/CD pipeline:

```yaml
# .github/workflows/e2e.yml (příklad)
- name: Start Test Database
  run: docker compose up -d test-db
  working-directory: apps/api

- name: Wait for DB
  run: sleep 5

- name: Run E2E Tests
  run: pnpm test:e2e
  working-directory: apps/api

- name: Cleanup
  if: always()
  run: docker compose down
  working-directory: apps/api
```

## Architecture

```
┌─────────────────────────────────────────┐
│         Development Machine             │
├─────────────────────────────────────────┤
│  API App (localhost:3000)               │
│  ├── uses NODE_ENV=test                 │
│  ├── loads .env.test                    │
│  └── connects to test-db via 5556       │
├─────────────────────────────────────────┤
│  Docker                                  │
│  └── postgres_test_db (port 5556)       │
│      └── vacuum_test database           │
└─────────────────────────────────────────┘
```

## Notes

- Test databáze je **in-container** — data se neuchovávají po zastavení
- Při vývoji se doporučuje nechat `test-db` běžet na pozadí
- E2E testy jsou **izolované** — nemohou ovlivnit dev/prod DB
- Migrační soubory pro testy se spouští automaticky přes NestJS bootstrap

---

Viz také: `jest-e2e.json`, `.env.test`, `docker-compose.yml`

