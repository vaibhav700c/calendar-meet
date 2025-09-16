import { BarLoader } from "react-spinners";

export default function LoadingSpinner({ text = "Loading..." }) {
  return (
    <div className="flex flex-col items-center justify-center py-12 space-y-4">
      <BarLoader color="#3b82f6" width={100} />
      <p className="text-gray-600 text-sm">{text}</p>
    </div>
  );
}