from fastapi.testclient import TestClient
from main import app

client = TestClient(app)

def test_get_heatmap_config():
    response = client.get("/config", params={"example": "heatmap"})
    assert response.status_code == 200
    columns = response.json()
    assert isinstance(columns, list)
    assert any("name" in col for col in columns)

def test_get_heatmap_data():
    response = client.get("/data", params={"example": "heatmap"})
    assert response.status_code == 200
    data = response.json()
    assert isinstance(data, list)
    assert isinstance(data[0], dict)
    assert "Price" in data[0]

def test_get_timestamp_config():
    response = client.get("/config", params={"example": "timestamp"})
    assert response.status_code == 200
    assert any(col["name"] == "Date" for col in response.json())

def test_get_score_config_with_rules():
    response = client.get("/config", params={"example": "score"})
    assert response.status_code == 200
    columns = response.json()
    score_col = next((col for col in columns if col["name"] == "Score"), None)
    assert score_col is not None
    assert "rules" in score_col
    assert isinstance(score_col["rules"], list)

def test_invalid_example_returns_empty():
    response = client.get("/config", params={"example": "unknown"})
    assert response.status_code == 422
