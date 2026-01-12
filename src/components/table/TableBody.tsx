import { Column } from "./types";

export default function TableBody<T extends Record<string, any>>({
  columns,
  data,
}: {
  columns: Column<T>[];
  data: T[];
}) {
  return (
    <tbody className="bg-zinc-700">
      {data.map((row, i) => (
        <tr key={i} className="border-b">
          {columns.map((col) => (
            <td
              key={String(col.key)}
              className="px-3 py-2 text-white text-left"
            >
              {row[col.key]}
            </td>
          ))}
        </tr>
      ))}
    </tbody>
  );
}
