import { useState, useRef } from "react";
import { ChevronsUpDown, ChevronUp, ChevronDown } from "lucide-react";
import { useClickAway } from "react-use";
import { Column } from "./types";

export default function TableHeader<T extends Record<string, any>>({
  columns,
  sort,
  setSort,
}: {
  columns: Column<T>[];
  sort: { key: keyof T; direction: "asc" | "desc" } | null;
  setSort: (val: { key: keyof T; direction: "asc" | "desc" }) => void;
}) {
  const [openSortKey, setOpenSortKey] = useState<keyof T | null>(null);
  const popoverRef = useRef<HTMLDivElement>(null);

  useClickAway(popoverRef, () => setOpenSortKey(null));

  const handleSort = (key: keyof T, direction: "asc" | "desc") => {
    setSort({ key, direction });
    setOpenSortKey(null);
  };

  return (
    <thead className="bg-zinc-800 sticky top-0">
      <tr>
        {columns.map((col) => {
          const isSorted = sort?.key === col.key;

          return (
            <th
              key={String(col.key)}
              className="px-3 py-2 text-left font-medium border-b relative"
            >
              <div className="flex items-center gap-1">
                <span>{col.label}</span>

                {col.sortable && (
                  <button
                    className="relative focus:outline-none"
                    onClick={() =>
                      setOpenSortKey(openSortKey === col.key ? null : col.key)
                    }
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        setOpenSortKey(
                          openSortKey === col.key ? null : col.key
                        );
                        e.preventDefault();
                      }
                    }}
                  >
                    {isSorted ? (
                      sort!.direction === "asc" ? (
                        <ChevronUp className="h-4 w-4 text-gray-600" />
                      ) : (
                        <ChevronDown className="h-4 w-4 text-gray-600" />
                      )
                    ) : (
                      <ChevronsUpDown className="h-4 w-4 text-gray-500" />
                    )}
                  </button>
                )}
              </div>

              {openSortKey === col.key && col.sortable && (
                <div
                  ref={popoverRef}
                  className="absolute z-10 mt-2 bg-white border rounded shadow text-sm"
                >
                  <button
                    className="block px-4 py-2 hover:bg-gray-100 w-full text-left"
                    onClick={() => handleSort(col.key, "asc")}
                  >
                    Sort A → Z
                  </button>
                  <button
                    className="block px-4 py-2 hover:bg-gray-100 w-full text-left"
                    onClick={() => handleSort(col.key, "desc")}
                  >
                    Sort Z → A
                  </button>
                </div>
              )}
            </th>
          );
        })}
      </tr>
    </thead>
  );
}
