import { Database, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function EmptyState({ 
  title = "No Data Found", 
  description = "There are no startup applications to display.", 
  isFiltered = false,
  onReset 
}) {
  return (
    <Card className="border-dashed border-2 border-gray-200">
      <CardContent className="py-12">
        <div className="text-center space-y-4">
          <div className="mx-auto w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center">
            {isFiltered ? (
              <Search className="w-8 h-8 text-blue-400" />
            ) : (
              <Database className="w-8 h-8 text-blue-400" />
            )}
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
            <p className="text-gray-600 mt-1">{description}</p>
          </div>
          {isFiltered && onReset && (
            <Button onClick={onReset} variant="outline">
              Clear Filters
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}