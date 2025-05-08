import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import App from "./App";

jest.mock("./api/gridService", () => {
  console.log("✅ gridService mock activated");
  return {
    getGridConfig: (example: string) => {
      if (example === "timestamp") {
        return Promise.resolve([
          { name: "Name", rules: [] },
          {
            name: "Date",
            rules: [{ condition: "recent", style: "bg-yellow-100" }],
          },
        ]);
      } else if (example === "score") {
        return Promise.resolve([
          { name: "Name", rules: [] },
          {
            name: "Score",
            rules: [
              { condition: "greater_than", value: 85, style: "bg-green-100" },
            ],
          },
        ]);
      } else if (example === "status") {
        return Promise.resolve([
          { name: "Name", rules: [] },
          {
            name: "Status",
            rules: [
              { condition: "equals", value: "Failed", style: "bg-red-100" },
            ],
          },
        ]);
      }
      return Promise.resolve([
        { name: "Price", rules: [] },
        { name: "Date", rules: [] },
      ]);
    },
    getGridData: (example: string) => {
      if (example === "timestamp") {
        return Promise.resolve([
          { Name: "Alice", Date: "2025-05-06T14:00:00Z" },
          { Name: "Bob", Date: "2025-05-01T10:00:00Z" },
        ]);
      } else if (example === "score") {
        return Promise.resolve([
          { Name: "John", Score: 90 },
          { Name: "Jane", Score: 75 },
        ]);
      } else if (example === "status") {
        return Promise.resolve([
          { Name: "DB Sync", Status: "Failed" },
          { Name: "API Health", Status: "Passed" },
        ]);
      }
      return Promise.resolve([
        { Price: 120, Date: "2025-04-21T10:20:00Z" },
        { Price: 80, Date: "2025-04-22T08:15:00Z" },
      ]);
    },
  };
});

test("renders mock Price value", async () => {
  render(<App />);
  await waitFor(() => {
    expect(screen.getByText("120")).toBeInTheDocument();
  });
});

test("renders timestamp example", async () => {
  render(<App />);
  fireEvent.click(screen.getByText("Timestamp Highlight Example"));
  await waitFor(() => {
    expect(screen.getByText("Alice")).toBeInTheDocument();
  });
});

test("renders score example", async () => {
  render(<App />);
  fireEvent.click(screen.getByText("Score > 85 Highlight"));
  await waitFor(() => {
    expect(screen.getByText("John")).toBeInTheDocument();
  });
});

test("renders status example", async () => {
  render(<App />);
  fireEvent.click(screen.getByText("Status = Failed Highlight"));
  await waitFor(() => {
    expect(screen.getByText("DB Sync")).toBeInTheDocument();
  });
});
