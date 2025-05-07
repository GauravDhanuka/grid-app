CONFIG_DATA_MAP = {
    "heatmap": {
        "columns": [
            {
                "name": "Price",
                "rules": [
                    {
                        "condition": "heatmap",
                        "scale": "red-white",
                        "style": "background-color",
                        "min": 50,
                        "max": 150
                    }
                ]
            },
            {"name": "Date"}
        ],
        "data": [
            {"Price": 120, "Date": "2025-04-21T10:20:00Z"},
            {"Price": 80, "Date": "2025-04-22T08:15:00Z"},
            {"Price": 95, "Date": "2025-04-22T12:00:00Z"},
            {"Price": 50, "Date": "2025-04-20T09:30:00Z"},
        ],
    },
    "timestamp": {
        "columns": [
            {"name": "Name"},
            {
                "name": "Date", 
                "rules": [
                    {
                        "condition": "recent",
                        "style": "bg-yellow-100"
                    }
                ]}
        ],
        "data": [
            {"Name": "Alice", "Date": "2025-05-06T14:00:00Z"},
            {"Name": "Bob", "Date": "2025-05-01T10:00:00Z"},
            {"Name": "Charlie", "Date": "2025-05-07T08:30:00Z"},
        ],
    },
    "score": {
        "columns": [
            {"name": "Name"},
            {
                "name": "Score",
                "rules": [
                    {
                        "condition": "greater_than",
                        "value": 85,
                        "style": "bg-green-100"
                    }
                ]
            },
        ],
        "data": [
            {"Name": "John", "Score": 90},
            {"Name": "Doe", "Score": 75},
            {"Name": "Jane", "Score": 88},
        ]
    },
    "status": {
        "columns": [
            {"name": "Name"},
            {
                "name": "Status",
                "rules": [
                    {
                        "condition": "equals",
                        "value": "Failed",
                        "style": "bg-red-100"
                    }
                ]
            },
        ],
        "data": [
            {"Name": "API Health Check", "Status": "Passed"},
            {"Name": "DB Sync", "Status": "Failed"},
            {"Name": "Cache Warmup", "Status": "Passed"},
        ]
    },
}

