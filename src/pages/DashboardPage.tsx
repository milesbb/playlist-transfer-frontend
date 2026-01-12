import "./DashboardPage.css";
import Header from "../components/Header";
import { checkIfBeta } from "../utils/checkIfBeta";
import BetaDog from "./BetaDog";
import DataTable from "../components/table/DataTable";
import { Column } from "../components/table/types";

type Playlist = {
  name: string;
  test1: string;
  test2: string;
};

const playlistColumns: Column<Playlist>[] = [
  { key: "name", label: "Name", sortable: true },
  { key: "test1", label: "Test 1", sortable: true },
  { key: "test2", label: "Test 2", sortable: true },
];

const testPlaylistData: Playlist[] = [
  { name: "nametest1", test1: "a3", test2: "b" },
  { name: "nametest2", test1: "a2", test2: "b" },
  { name: "apple", test1: "a1", test2: "b" },
];

function DashboardPage() {
  const isBeta = checkIfBeta();

  return (
    <div className="dashboard-container flex flex-col min-h-screen">
      <Header location="Playlists" />

      {!isBeta ? (
        <div className="flex flex-col items-center justify-center flex-grow">
          <BetaDog />
        </div>
      ) : (
        <>
          <DataTable<Playlist>
            data={testPlaylistData}
            columns={playlistColumns}
          />
        </>
      )}
    </div>
  );
}

export default DashboardPage;
