# Configurable Grid App

This project is a full-stack web application that displays configurable data grids, where grid styling and behavior is driven entirely by API-provided configuration.

## ✨ Features

- Config-driven rendering of column styles (e.g. heatmap, conditional row highlights)
- Example-specific tabs to demonstrate flexibility
- Backend with FastAPI and centralized `fixtures.py`
- Frontend built with React + TypeScript + Tailwind CSS
- Supports:
  - Heatmap coloring for numeric values
  - Row highlighting based on recent timestamps
  - Threshold-based highlighting (e.g., Score > 85)
  - Value match highlighting (e.g., Status = Failed)

## 🛠 Tech Stack

- **Backend**: FastAPI (Python 3.10+)
- **Frontend**: React + TypeScript
- **Styling**: Tailwind CSS
- **API Communication**: Axios

## 🚀 Running Locally

### Backend (FastAPI)

```bash
cd backend
python -m venv venv
source venv/bin/activate  # or venv\Scripts\activate on Windows
pip install -r requirements.txt
uvicorn main:app --reload
```
