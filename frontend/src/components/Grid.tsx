import React from "react";
import dayjs from "dayjs";

import { getHeatmapColor, ruleHandlers } from "../utils/ruleUtils";
import { ColumnConfig, GridProps, RowData } from "../types/gridTypes";

const Grid: React.FC<GridProps> = ({ columns, data }) => {
  const getRowClass = (row: RowData): string => {
    for (const col of columns) {
      const val = row[col.name];
      if (!col.rules) continue;

      for (const rule of col.rules) {
        const handler = ruleHandlers[rule.condition];
        if (handler && handler(rule, val)) {
          return rule.style ?? "bg-gray-100";
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
