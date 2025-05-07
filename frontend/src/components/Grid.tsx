import React from "react";
import dayjs from "dayjs";

interface Rule {
  condition: "equals" | "greater_than" | "recent" | string;
  value: any;
  style: string;
}

interface ColumnConfig {
  name: string;
  heatmap?: boolean;
  rules?: Rule[];
}

interface RowData {
  [key: string]: string | number;
}

interface GridProps {
  columns: ColumnConfig[];
  data: RowData[];
}

const Grid: React.FC<GridProps> = ({ columns, data }) => {
  if (!columns) return null;

  // Helper to check if a timestamp is < 24 hours old
  const isRecent = (dateStr: string) => {
    return dayjs().diff(dayjs(dateStr), "hour") < 24;
  };

  // Helper to highlight rows based on timestamp
  const shouldHighlight = (row: RowData) => {
    for (const col of columns) {
      const value = row[col.name];
      if (!col.rules) continue;

      for (const rule of col.rules) {
        switch (rule.condition) {
          case "equals":
            if (value === rule.value) return rule.style;
            break;
          case "greater_than":
            if (typeof value === "number" && value > rule.value)
              return rule.style;
            break;
          case "recent":
            if (typeof value === "string" && isRecent(value)) return rule.style;
            break;
          // more conditions in future
        }
      }
    }
    return "";
  };

  // Compute heatmap values only once for each column
  const heatmapValuesMap: Record<string, number[]> = {};
  columns.forEach((col) => {
    if (col.heatmap) {
      heatmapValuesMap[col.name] = data.map((row) => row[col.name] as number);
    }
  });

  const getColor = (value: number, allValues: number[]) => {
    const min = Math.min(...allValues);
    const max = Math.max(...allValues);
    const percent = (value - min) / (max - min + 0.0001); // prevent /0
    const intensity = Math.floor(percent * 255);
    return `rgb(255, ${255 - intensity}, ${255 - intensity})`;
  };

  return (
    <div className="p-4">
      <table className="w-full table-auto border border-gray-400">
        <thead>
          <tr>
            {columns.map((col) => (
              <th key={col.name} className="border p-2 bg-gray-100 text-left">
                {col.name}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr key={rowIndex} className={shouldHighlight(row)}>
              {columns.map((col) => {
                const val = row[col.name];
                let style = {};

                if (
                  col.heatmap &&
                  typeof val === "number" &&
                  heatmapValuesMap[col.name]
                ) {
                  style = {
                    backgroundColor: getColor(val, heatmapValuesMap[col.name]),
                  };
                }

                return (
                  <td key={col.name} className="border p-2" style={style}>
                    {val}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Grid;
