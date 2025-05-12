
export interface Rule {
    condition:
      | "equals"
      | "greater_than"
      | "smaller_than"
      | "recent"
      | "heatmap"
      | string;
    value?: any;
    style?: string;
    min?: number;
    max?: number;
    scale?: string; // e.g. "red-white"
  }
  
export interface ColumnConfig {
    name: string;
    rules?: Rule[];
  }
  
export interface RowData {
    [key: string]: string | number;
  }
  
export interface GridProps {
    columns: ColumnConfig[];
    data: RowData[];
  }