from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# Allow frontend local development origin
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"message": "Welcome to Configurable Grid API"}

@app.get("/config")
def get_config():
    return {
        "columns": [
            {"name": "Price", "heatmap": True},
            {"name": "Date", "highlightRecent": True}
        ]
    }

@app.get("/data")
def get_data():
    return [
        {"Price": 120, "Date": "2025-04-21T10:20:00Z"},
        {"Price": 80, "Date": "2025-04-22T08:15:00Z"},
        {"Price": 95, "Date": "2025-04-22T12:00:00Z"},
        {"Price": 50, "Date": "2025-04-20T09:30:00Z"}
    ]
