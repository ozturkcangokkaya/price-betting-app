import React from "react";
import { ScaleLoader } from "react-spinners";
import useUserStore from "@/store/userStore";

const TableHeaderCell: React.FC<{ value: string }> = ({ value }) => (
  <th className="py-2 px-4 font-bold text-lg text-left border border-gray-300 border-r-0 capitalize">
    {value}
  </th>
);

const TableCell: React.FC<{ value: React.ReactNode }> = ({ value }) => (
  <td className="border border-gray-300 px-4 py-2 capitalize">{value}</td>
);

const formatDate = (timestamp: number): string => {
  const date = new Date(timestamp);
  return date.toLocaleString();
};

const getRowClassName = (result?: string) => {
  let className: string | undefined;
  if (result === "profit") {
    className = "bg-green-100";
  } else if (result === "loss") {
    className = "bg-red-100";
  } else if (result === "break even") {
    className = "bg-blue-100";
  }

  return className;
};

const Bets: React.FC = () => {
  const { bets } = useUserStore();

  return (
    <table className="border border-collapse-separate w-full max-w-screen-lg">
      <thead className="bg-gray-100">
        <tr>
          <TableHeaderCell value="Opened At" />
          <TableHeaderCell value="Open Price" />
          <TableHeaderCell value="Close Price" />
          <TableHeaderCell value="Direction" />
          <TableHeaderCell value="Result" />
        </tr>
      </thead>
      <tbody>
        {bets.length === 0 ? (
          <tr>
            <td colSpan={5} style={{ textAlign: "center", padding: "8px" }}>
              No bets placed yet.
            </td>
          </tr>
        ) : (
          bets.map(
            ({ betId, openPrice, closePrice, direction, openedAt, result }) => (
              <tr key={betId} className={getRowClassName(result)}>
                <TableCell value={formatDate(openedAt)} />
                <TableCell value={openPrice.toFixed(2)} />
                <TableCell
                  value={
                    closePrice?.toFixed(2) ?? (
                      <ScaleLoader
                        aria-label="Bet is still in progress"
                        width={3}
                        height={14}
                      />
                    )
                  }
                />
                <TableCell value={direction} />
                <TableCell value={result ?? "-"} />
              </tr>
            )
          )
        )}
      </tbody>
    </table>
  );
};

export default Bets;
