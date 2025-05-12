# 🧩 Grid App

This is a full-stack web application that renders configurable data grids. The grid's structure, behavior, and visual styling are entirely driven by configuration received from the backend API.

This implementation is ideal for building reusable, schema-driven tables that can change appearance and logic based on server-defined rules — without needing frontend code changes.

---

## 🚀 Features

- ⚙️ Grid layout and styling are dynamically controlled by backend config
- 🎨 Supports:
  - Column-based heatmaps
  - Conditional row highlighting (e.g. recent dates, numeric thresholds, text matches)
- 🧪 Multiple examples demonstrated via interactive tabs
- 🔄 Easily extendable for new grid behavior without frontend rewrites
- 🧼 Clean separation of backend-config + frontend-rendering

---

## 🛠 Tech Stack

| Layer    | Tech                                |
| -------- | ----------------------------------- |
| Frontend | React + TypeScript + Tailwind CSS   |
| Backend  | FastAPI (Python)                    |
| API      | REST endpoints (`/config`, `/data`) |
| Styling  | Tailwind utility classes            |

---

## 🧱 Architecture Overview

### 🔁 Configuration-Driven Flow

```txt
[Frontend]
↓       fetch /config?example=x
↓       fetch /data?example=x
→ Render grid based on schema + data

[Backend]
- Provides `columns` config and matching `data`
- Uses a central CONFIG_DATA_MAP for multiple example definitions
```

---

## 🧪 Supported Examples

| Example   | Behavior                                          |
| --------- | ------------------------------------------------- |
| Heatmap   | Color-coded cells based on numeric values         |
| Timestamp | Highlights rows with recent (last 24h) timestamps |
| Score     | Highlights rows where `Score > 85`                |
| Status    | Highlights rows where `Status == Failed`          |

Each example is selectable via the UI tabs.

---

## 📁 Project Structure

```
grid-app/
├── backend/
│   ├── main.py                 # FastAPI app with /config and /data routes
│   ├── fixtures.py             # Centralized grid config & sample data
│   ├── tests/
│   │   └── test_api.py         # Backend unit tests
│   └── requirements.txt
└── frontend/
    ├── src/
    │   ├── api/
    │   │   ├── apiClient.ts
    │   │   └── gridService.ts
    │   ├── components/
    │   │   └── Grid.tsx        # Generic configurable grid
    │   ├── utils/
    │   │   └── ruleUtils.ts    # Generic Rule Handler
    │   ├── types/
    │   │   └── gridTypes.ts    # Interfaces for Grid component
    │   ├── App.tsx             # Entry component with tabs
    │   └── index.tsx
    ├── App.test.tsx            # Frontend tests for App component
    └── tailwind.config.js
```

---

## 🔧 Running Locally

### ▶️ Backend

```bash
cd backend
python -m venv venv
source venv/bin/activate         # Windows: venv\Scripts\activate
pip install -r requirements.txt
uvicorn main:app --reload
```

> The backend runs at `http://localhost:8000`

---

### ▶️ Frontend

```bash
cd frontend
npm install
npm start
```

> The frontend runs at `http://localhost:3000` and connects to the backend API.

---

## 🌐 API Endpoints

| Endpoint                    | Description                            |
| --------------------------- | -------------------------------------- |
| `/config?example=heatmap`   | Grid column config for heatmap         |
| `/data?example=heatmap`     | Grid row data for heatmap              |
| `/config?example=timestamp` | Config for recent-timestamp styling    |
| `/config?example=score`     | Config for numeric threshold highlight |
| `/config?example=status`    | Config for status match highlighting   |

---

## 📄 Running Tests

### 🔢 Backend Tests (FastAPI + Pytest)

```bash
cd backend
pytest tests
```

- Validates `/config` and `/data` routes
- Checks for correct response shape and validation

### 🔢 Frontend Tests (Jest + React Testing Library)

```bash
cd frontend
npm test
```

- Tests rendering of each tab (heatmap, timestamp, score, status)
- Mocks API calls with `jest.mock`
- Asserts data rendering and tab behavior

> Use `npm test -- --watchAll=false` for a one-time run.

---

## 🧠 Notes

- The current implementation is easily extendable to **schema-driven conditional rules** (e.g., dynamic condition/style logic)
- The backend can support validation or rule-based transforms
- Frontend can be made fully generic by interpreting rule sets from config (e.g., `equals`, `greater_than`, `recent`, etc.)

---
