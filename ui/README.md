# SPS Admin UI

React Admin UI for the AV Delivery service.

## Setup

```bash
cd sps/ui
npm install
```

## Run

1. Start the backend (from repo root):

```bash
make run-avdelivery
```

2. Start the Vite dev server:

```bash
cd sps/ui
npm run dev
```

3. Open http://localhost:5173.

The Vite dev server proxies `/api` to the backend at `http://localhost:8082`.
