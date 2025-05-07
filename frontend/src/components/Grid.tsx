import React, { useEffect, useState } from "react";
import { getGridConfig, getGridData } from "../api/gridService";
import dayjs from "dayjs";

interface ColumnConfig {
  name: string;
  heatmap?: boolean;
  highlightRecent?: boolean;
}

interface RowData {
  [key: string]: string | number;
}

const Grid: React.FC = () => {
  const [columns, setColumns] = useState<ColumnConfig[]>([]);
  const [data, setData] = useState<RowData[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const config = await getGridConfig();
      const rows = await getGridData();
      setColumns(config.columns);
      setData(rows);
    };

    fetchData();
  }, []);

  // Compute heatmap ranges
  const getColor = (value: number, allValues: number[]) => {
    const min = Math.min(...allValues);
    const max = Math.max(...allValues);
    const percent = (value - min) / (max - min + 0.0001);
    const intensity = Math.floor(percent * 255);
    return `rgb(255, ${255 - intensity}, ${255 - intensity})`;
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Dynamic Grid</h2>
      <table className="w-full table-auto border border-gray-400">
        <thead>
          <tr>
            {columns.map((col) => (
              <th key={col.name} className="border p-2 bg-gray-100">
                {col.name}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => {
            const isRecent = (dateStr: string) =>
              dayjs().diff(dayjs(dateStr), "hour") < 24;

            return (
              <tr
                key={rowIndex}
                className={`${
                  columns.some(
                    (col) =>
                      col.highlightRecent &&
                      typeof row[col.name] === "string" &&
                      isRecent(row[col.name] as string)
                  )
                    ? "bg-yellow-100"
                    : ""
                }`}
              >
                {columns.map((col) => {
                  const val = row[col.name];
                  let style = {};

                  if (
                    col.heatmap &&
                    typeof val === "number" &&
                    data.every((d) => typeof d[col.name] === "number")
                  ) {
                    const values = data.map((d) => d[col.name] as number);
                    style = { backgroundColor: getColor(val, values) };
                  }

                  return (
                    <td key={col.name} className="border p-2" style={style}>
                      {val}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Grid;
