import StartupDataTable from "./_components/startup-data-table";

export default function FetchDetailsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Startup Details</h1>
        <p className="text-gray-600 mt-2">
          View and search through startup applications and details from MongoDB
        </p>
      </div>

      <StartupDataTable />
    </div>
  );
}