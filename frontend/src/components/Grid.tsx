import React from "react";
import dayjs from "dayjs";

interface Rule {
  condition: "equals" | "greater_than" | "recent" | "heatmap";
  value?: any;
  style?: string;
  min?: number;
  max?: number;
  scale?: string; // e.g. "red-white"
}

interface ColumnConfig {
  name: string;
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
  const isRecent = (dateStr: string) => {
    return dayjs().diff(dayjs(dateStr), "hour") < 24;
  };

  const getHeatmapColor = (
    value: number,
    min: number,
    max: number,
    scale: string = "red-white"
  ) => {
    const percent = (value - min) / (max - min + 0.0001);
    const intensity = Math.floor(percent * 255);
    return scale === "red-white"
      ? `rgb(255, ${255 - intensity}, ${255 - intensity})`
      : `rgba(0, 0, 0, 0.1)`; // fallback
  };

  const getRowClass = (row: RowData): string => {
    for (const col of columns) {
      const val = row[col.name];
      if (!col.rules) continue;

      for (const rule of col.rules) {
        if (rule.condition === "recent" && typeof val === "string") {
          if (isRecent(val)) return rule.style ?? "bg-yellow-100";
          else return "bg-gray-100";
        }

        if (rule.condition === "equals" && val === rule.value) {
          return rule.style ?? "bg-red-100";
        }

        if (rule.condition === "greater_than" && typeof val === "number") {
          if (val > rule.value) return rule.style ?? "bg-green-100";
        }
      }
    }

    return "";
  };

  const getCellStyle = (col: ColumnConfig, val: any): React.CSSProperties => {
    if (!col.rules) return {};

    for (const rule of col.rules) {
      if (rule.condition === "heatmap" && typeof val === "number") {
        const min =
          rule.min ?? Math.min(...data.map((d) => d[col.name] as number));
        const max =
          rule.max ?? Math.max(...data.map((d) => d[col.name] as number));
        const bg = getHeatmapColor(val, min, max, rule.scale);
        return { backgroundColor: bg };
      }
    }

    return {};
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
            <tr key={rowIndex} className={getRowClass(row)}>
              {columns.map((col) => {
                const val = row[col.name];
                const style = getCellStyle(col, val);
                return (
                  <td key={col.name} className="border p-2" style={style}>
                    {val !== undefined ? (
                      val
                    ) : (
                      <span className="text-gray-400 italic">N/A</span>
                    )}
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
