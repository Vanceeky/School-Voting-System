import React, { useRef, useState } from "react";
import * as XLSX from "xlsx";
import { UploadCloud, FileText, X, Users } from "lucide-react";
import { Dialog, DialogTrigger, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@radix-ui/react-dropdown-menu";

export default function VoterUploadDialog() {
  const fileInputRef = useRef(null);
  const [fileName, setFileName] = useState("");
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 50;

  const totalPages = Math.ceil(students.length / rowsPerPage);
  const currentRows = students.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  const handleFile = (file) => {
    setFileName(file.name);
    setLoading(true);
    setCurrentPage(1); // reset pagination

    const reader = new FileReader();
    reader.onload = (e) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: "array" });
      const worksheet = workbook.Sheets[workbook.SheetNames[0]];
      const rows = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

      const formatted = rows.slice(1).map((row) => ({
        name: row[0],
        student_id: row[1],
        email: row[2],
        course: row[3],
        year_level: row[4],
      }));

      setStudents(formatted);
      setLoading(false);
    };
    reader.readAsArrayBuffer(file);
  };

  const handleBrowse = (e) => {
    const file = e.target.files[0];
    if (file) handleFile(file);
  };

  const handleRemoveFile = () => {
    setStudents([]);
    setFileName("");
    setCurrentPage(1);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">
          <UploadCloud className="w-4 h-4 mr-2" />
          Upload Voter List
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto" style={{ maxWidth: "60vw" }}>
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Upload Voter List</h2>
          <p className="text-sm text-muted-foreground">
            Upload an Excel (.xlsx) file with voter information. Expected columns:{" "}
            <strong>Name, Student ID, Email, Course, Year Level.</strong>
          </p>

          {/* Upload Box */}
          {!fileName && (
            <Card
              className="p-6 flex items-center justify-center border-dashed border-2 border-gray-300 bg-gray-50 hover:bg-gray-100 cursor-pointer"
              onClick={() => fileInputRef.current.click()}
            >
              <UploadCloud className="w-10 h-10 text-blue-500 mr-2" />
              <span className="text-blue-500 font-medium">Browse File to Upload</span>
              <input
                type="file"
                accept=".xlsx, .xls"
                ref={fileInputRef}
                onChange={handleBrowse}
                className="hidden"
              />
            </Card>
          )}

          {/* File Preview */}
          {fileName && (
            <div className="flex items-center justify-between border px-4 py-2 rounded-md bg-white shadow-sm">
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-blue-600" />
                <div>
                  <p className="font-medium">{fileName}</p>
                  <p className="text-xs text-muted-foreground">{students.length} records found</p>
                </div>
              </div>
              <button onClick={handleRemoveFile}>
                <X className="w-4 h-4 text-gray-500 hover:text-red-500" />
              </button>
            </div>
          )}

          {/* Loading State or Table */}
          {loading ? (
            <div className="flex items-center gap-2 text-blue-600 px-4 py-2">
              <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v8z"
                />
              </svg>
              Reading Excel file...
            </div>
          ) : students.length > 0 && (
            <>
              {/* Table */}
              <div className="overflow-auto max-h-[400px] border rounded-md">
                <table className="min-w-full text-sm text-left border-collapse">
                  <thead className="sticky top-0 z-10 bg-gray-100 text-gray-700 shadow-sm">
                    <tr>
                      <th className="px-4 py-2 border-r w-12 text-center">#</th>
                      <th className="px-4 py-2">Name</th>
                      <th className="px-4 py-2">Student ID</th>
                      <th className="px-4 py-2">Email</th>
                      <th className="px-4 py-2">Course</th>
                      <th className="px-4 py-2">Year Level</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentRows.map((s, i) => (
                      <tr key={i} className="border-t even:bg-gray-50">
                        <td className="px-4 py-2 text-center font-medium">
                          {(currentPage - 1) * rowsPerPage + i + 1}
                        </td>
                        <td className="px-4 py-2">{s.name}</td>
                        <td className="px-4 py-2">{s.student_id}</td>
                        <td className="px-4 py-2">{s.email}</td>
                        <td className="px-4 py-2">{s.course}</td>
                        <td className="px-4 py-2">{s.year_level}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Pagination Controls */}
              <div className="flex justify-between items-center mt-2 px-1 text-sm text-muted-foreground">
                <div>
                  Showing {Math.min((currentPage - 1) * rowsPerPage + 1, students.length)}–
                  {Math.min(currentPage * rowsPerPage, students.length)} of {students.length}
                </div>
                <div className="space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage((p) => p - 1)}
                  >
                    Previous
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    disabled={currentPage === totalPages}
                    onClick={() => setCurrentPage((p) => p + 1)}
                  >
                    Next
                  </Button>
                </div>
                
              </div>
            </>
          )}

         <Separator className="my-4 border-1 border-secondary" />

          {/* Action Buttons */}
          <div className="flex justify-between items-center pt-4">
            <Button variant="ghost" onClick={handleRemoveFile}>
              Cancel
            </Button>
            <Button disabled={!students.length}>
              <Users className="w-4 h-4 mr-2" />
              Import {students.length} Voters
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
