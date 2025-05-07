import React, { useEffect, useState } from "react";
import Grid from "./components/Grid";
import { getGridConfig, getGridData } from "./api/gridService";

type ExampleType = "heatmap" | "timestamp" | "score" | "status";

const EXAMPLE_LABELS: Record<ExampleType, string> = {
  heatmap: "Heatmap Example",
  timestamp: "Timestamp Highlight Example",
  score: "Score > 85 Highlight",
  status: "Status = Failed Highlight",
};

function App() {
  const [example, setExample] = useState<ExampleType>("heatmap");
  const [config, setConfig] = useState<any>(null);
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    const fetchExample = async () => {
      const cfg = await getGridConfig(example);
      const rows = await getGridData(example);
      setConfig(cfg);
      setData(rows);
    };

    fetchExample();
  }, [example]);

  return (
    <div className="max-w-5xl mx-auto py-10">
      <h1 className="text-2xl font-bold mb-4 text-center">
        Configurable Grid Demo
      </h1>

      <div className="flex justify-center gap-4 mb-6 flex-wrap">
        {(Object.keys(EXAMPLE_LABELS) as ExampleType[]).map((ex) => (
          <button
            key={ex}
            className={`px-4 py-2 rounded border ${
              ex === example
                ? "bg-blue-600 text-white"
                : "bg-white border-gray-300"
            }`}
            onClick={() => setExample(ex)}
          >
            {EXAMPLE_LABELS[ex]}
          </button>
        ))}
      </div>

      {config && data.length > 0 ? (
        <Grid columns={config} data={data} />
      ) : (
        <p className="text-center text-gray-500">Loading grid...</p>
      )}
    </div>
  );
}

export default App;
