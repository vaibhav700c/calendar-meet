"use client";

import { useState, useEffect, useMemo } from "react";
import { Search, Download, Eye, Mail, Phone, ExternalLink, RefreshCw } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import LoadingSpinner from "./loading-spinner";
import EmptyState from "./empty-state";
import StartupDetailModal from "./startup-detail-modal";

export default function StartupDataTable() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [stageFilter, setStageFilter] = useState("all");
  const [mentorshipFilter, setMentorshipFilter] = useState("all");
  const [sortColumn, setSortColumn] = useState("created_at");
  const [sortDirection, setSortDirection] = useState("desc");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/startup");
      const result = await response.json();
      
      if (result.success) {
        setData(result.data);
        setError(null);
      } else {
        setError(result.error);
      }
    } catch (err) {
      setError("Failed to fetch data");
      console.error("Fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  const filteredAndSortedData = useMemo(() => {
    let filtered = data.filter((item) => {
      const matchesSearch = !searchTerm || 
        Object.values(item).some(value => 
          value && value.toString().toLowerCase().includes(searchTerm.toLowerCase())
        );
      
      const matchesStage = stageFilter === "all" || item.stage === stageFilter;
      const matchesMentorship = mentorshipFilter === "all" || 
        (mentorshipFilter === "yes" && item.mentorship) ||
        (mentorshipFilter === "no" && !item.mentorship);

      return matchesSearch && matchesStage && matchesMentorship;
    });

    if (sortColumn) {
      filtered.sort((a, b) => {
        let aVal = a[sortColumn];
        let bVal = b[sortColumn];
        
        if (sortColumn === "created_at" || sortColumn === "updated_at") {
          aVal = new Date(aVal);
          bVal = new Date(bVal);
        }
        
        if (aVal < bVal) return sortDirection === "asc" ? -1 : 1;
        if (aVal > bVal) return sortDirection === "asc" ? 1 : -1;
        return 0;
      });
    }

    return filtered;
  }, [data, searchTerm, stageFilter, mentorshipFilter, sortColumn, sortDirection]);

  const uniqueStages = [...new Set(data.map(item => item.stage).filter(Boolean))];

  const formatCurrency = (amount) => {
    if (!amount) return "N/A";
    const numAmount = Number(amount);
    if (isNaN(numAmount)) return "N/A";
    
    // Convert to lakhs if amount is >= 100000 (1 lakh)
    if (numAmount >= 100000) {
      const lakhs = numAmount / 100000;
      return `₹${lakhs.toFixed(1)} Lakh${lakhs !== 1 ? 's' : ''}`;
    } else {
      return new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR",
        minimumFractionDigits: 0,
      }).format(numAmount);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const handleSort = (column) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(column);
      setSortDirection("asc");
    }
  };

  const exportToCSV = () => {
    if (filteredAndSortedData.length === 0) return;
    
    const headers = [
      "Startup Name", "Founder Name", "Email", "Phone", "Stage", 
      "Funding Amount", "Team Size", "Mentorship", "Description", 
      "Problem", "Audience", "Competitors", "Created Date"
    ];
    
    const csvData = filteredAndSortedData.map(row => [
      row.startupname || "",
      row.fullname || "",
      row.email || "",
      row.phone || "",
      row.stage || "",
      formatCurrency(row.fundingamount),
      row.teamsize || "",
      row.mentorship ? "Yes" : "No",
      row.description || "",
      row.problem || "",
      row.audience || "",
      row.competitors || "",
      formatDate(row.created_at)
    ]);

    const csvContent = [
      headers.join(","),
      ...csvData.map(row => 
        row.map(value => `"${String(value).replace(/"/g, '""')}"`).join(",")
      )
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `startup_data_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const clearFilters = () => {
    setSearchTerm("");
    setStageFilter("all");
    setMentorshipFilter("all");
  };

  if (loading) {
    return <LoadingSpinner text="Loading startup data..." />;
  }

  if (error) {
    return (
      <Card className="border-red-200">
        <CardContent className="py-6">
          <div className="text-center text-red-600">
            <p className="font-semibold">Error loading data</p>
            <p className="text-sm">{error}</p>
            <Button onClick={fetchData} className="mt-4" variant="outline">
              <RefreshCw className="w-4 h-4 mr-2" />
              Try Again
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="py-6">
            <div className="text-center">
              <p className="text-2xl font-bold text-blue-600">{data.length}</p>
              <p className="text-gray-600">Total Applications</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="py-6">
            <div className="text-center">
              <p className="text-2xl font-bold text-green-600">
                {data.filter(item => item.mentorship).length}
              </p>
              <p className="text-gray-600">Seeking Mentorship</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="py-6">
            <div className="text-center">
              <p className="text-2xl font-bold text-purple-600">
                {(() => {
                  const total = data.reduce((sum, item) => sum + (Number(item.fundingamount) || 0), 0);
                  return formatCurrency(total);
                })()}
              </p>
              <p className="text-gray-600">Total Funding Sought</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="py-6">
            <div className="text-center">
              <p className="text-2xl font-bold text-orange-600">
                {uniqueStages.length}
              </p>
              <p className="text-gray-600">Different Stages</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Startup Applications</span>
            <div className="flex items-center space-x-2">
              <Button onClick={fetchData} variant="outline" size="sm">
                <RefreshCw className="w-4 h-4 mr-2" />
                Refresh
              </Button>
              <Button onClick={exportToCSV} variant="outline" size="sm">
                <Download className="w-4 h-4 mr-2" />
                Export CSV
              </Button>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search startups, names, emails..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={stageFilter} onValueChange={setStageFilter}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Filter by stage" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Stages</SelectItem>
                {uniqueStages.map(stage => (
                  <SelectItem key={stage} value={stage}>{stage}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={mentorshipFilter} onValueChange={setMentorshipFilter}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Mentorship" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="yes">Seeking Mentorship</SelectItem>
                <SelectItem value="no">Not Seeking</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {filteredAndSortedData.length === 0 ? (
            <div className="col-span-full py-8">
              <EmptyState 
                title={data.length === 0 ? "No Startup Data" : "No Results Found"}
                description={data.length === 0 ? 
                  "No startup applications found in the database. Check your MongoDB connection and collection." : 
                  "No startups match your current search criteria. Try adjusting your filters."
                }
                isFiltered={searchTerm || stageFilter !== "all" || mentorshipFilter !== "all"}
                onReset={clearFilters}
              />
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead 
                      className="cursor-pointer hover:bg-gray-50"
                      onClick={() => handleSort("startupname")}
                    >
                      Startup Name {sortColumn === "startupname" && (sortDirection === "asc" ? "↑" : "↓")}
                    </TableHead>
                    <TableHead 
                      className="cursor-pointer hover:bg-gray-50"
                      onClick={() => handleSort("fullname")}
                    >
                      Founder {sortColumn === "fullname" && (sortDirection === "asc" ? "↑" : "↓")}
                    </TableHead>
                    <TableHead>Contact</TableHead>
                    <TableHead 
                      className="cursor-pointer hover:bg-gray-50"
                      onClick={() => handleSort("stage")}
                    >
                      Stage {sortColumn === "stage" && (sortDirection === "asc" ? "↑" : "↓")}
                    </TableHead>
                    <TableHead 
                      className="cursor-pointer hover:bg-gray-50"
                      onClick={() => handleSort("fundingamount")}
                    >
                      Funding {sortColumn === "fundingamount" && (sortDirection === "asc" ? "↑" : "↓")}
                    </TableHead>
                    <TableHead>Team Size</TableHead>
                    <TableHead>Mentorship</TableHead>
                    <TableHead 
                      className="cursor-pointer hover:bg-gray-50"
                      onClick={() => handleSort("created_at")}
                    >
                      Applied {sortColumn === "created_at" && (sortDirection === "asc" ? "↑" : "↓")}
                    </TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredAndSortedData.map((startup) => (
                    <TableRow 
                      key={startup._id} 
                      className="hover:bg-gray-50"
                    >
                      <TableCell className="font-medium">
                        <div>
                          <p className="font-semibold text-blue-600">{startup.startupname || "N/A"}</p>
                          <p className="text-sm text-gray-500 truncate max-w-48">
                            {startup.description || "No description"}
                          </p>
                        </div>
                      </TableCell>
                      <TableCell>{startup.fullname || "N/A"}</TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <div className="flex items-center text-sm">
                            <Mail className="w-3 h-3 mr-1 text-gray-400" />
                            <span className="truncate max-w-32">{startup.email}</span>
                          </div>
                          {startup.phone && (
                            <div className="flex items-center text-sm text-gray-600">
                              <Phone className="w-3 h-3 mr-1 text-gray-400" />
                              <span>{startup.phone}</span>
                            </div>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{startup.stage || "N/A"}</Badge>
                      </TableCell>
                      <TableCell className="font-medium">
                        {formatCurrency(startup.fundingamount)}
                      </TableCell>
                      <TableCell>{startup.teamsize || "N/A"}</TableCell>
                      <TableCell>
                        <Badge variant={startup.mentorship ? "default" : "secondary"}>
                          {startup.mentorship ? "Yes" : "No"}
                        </Badge>
                      </TableCell>
                      <TableCell>{formatDate(startup.created_at)}</TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <StartupDetailModal 
                            startup={startup}
                            formatCurrency={formatCurrency}
                            formatDate={formatDate}
                            trigger={
                              <Button size="sm" variant="ghost">
                                <Eye className="w-4 h-4" />
                              </Button>
                            }
                          />
                          {startup.linkedin && (
                            <Button 
                              size="sm" 
                              variant="ghost"
                              onClick={() => window.open(startup.linkedin, "_blank")}
                            >
                              <ExternalLink className="w-4 h-4" />
                            </Button>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}