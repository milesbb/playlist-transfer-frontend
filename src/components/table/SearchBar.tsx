export default function SearchBar({
  search,
  setSearch,
}: {
  search: string;
  setSearch: (val: string) => void;
}) {
  return (
    <div className="w-full p-3 bg-zinc-700 border-b">
      <input
        type="text"
        className="block w-64 px-3 py-1.5 border rounded-md text-sm"
        placeholder="Search…"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
    </div>
  );
}
