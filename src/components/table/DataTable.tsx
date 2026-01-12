import { useState, useMemo } from "react";
import TableHeader from "./TableHeader";
import TableBody from "./TableBody";
import { Column } from "./types";
import SearchBar from "./SearchBar";

export default function DataTable<T extends Record<string, any>>({
  data,
  columns,
}: {
  data: T[];
  columns: Column<T>[];
}) {
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState<{
    key: keyof T;
    direction: "asc" | "desc";
  } | null>(null);

  const filteredData = useMemo(() => {
    let rows = data.filter((row) =>
      Object.values(row).some((value) =>
        String(value).toLowerCase().includes(search.toLowerCase())
      )
    );

    if (sort) {
      rows = [...rows].sort((a, b) => {
        const aVal = String(a[sort.key]);
        const bVal = String(b[sort.key]);
        return sort.direction === "asc"
          ? aVal.localeCompare(bVal)
          : bVal.localeCompare(aVal);
      });
    }

    return rows;
  }, [data, search, sort]);

  return (
    <div className="h-full flex flex-col">
      <SearchBar search={search} setSearch={setSearch} />
      <div className="flex-1 overflow-auto">
        <table className="w-full text-sm border-collapse">
          <TableHeader columns={columns} sort={sort} setSort={setSort} />
          <TableBody columns={columns} data={filteredData} />
        </table>
      </div>
    </div>
  );
}
