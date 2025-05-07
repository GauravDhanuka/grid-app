from fastapi import FastAPI, Query
from fastapi.middleware.cors import CORSMiddleware
from typing import Literal
from fixtures import CONFIG_DATA_MAP

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/config")
def get_config(example: Literal["heatmap", "timestamp", "score", "status"] = "heatmap"):
    return CONFIG_DATA_MAP.get(example, {}).get("columns", [])

@app.get("/data")
def get_data(example: Literal["heatmap", "timestamp", "score", "status"] = "heatmap"):
    return CONFIG_DATA_MAP.get(example, {}).get("data", [])
