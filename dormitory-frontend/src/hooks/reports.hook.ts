import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { GenerateReportDto, ReportTypesResponse } from "@/types/reports.types";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

export const useReports = () => {
  const getReportTypes = useQuery<ReportTypesResponse>({
    queryKey: ["reportTypes"],
    queryFn: async () => {
      const response = await axios.get(`${API_URL}/reports/types`, {
        withCredentials: true,
      });
      return response.data;
    },
  });

  const generateReport = useMutation({
    mutationFn: async (dto: GenerateReportDto) => {
      const response = await axios.post(`${API_URL}/reports/generate`, dto, {
        withCredentials: true,
        responseType: "blob",
      });
      return response.data;
    },
    onSuccess: (data, variables) => {
      // Create a download link for the Excel file
      const url = window.URL.createObjectURL(new Blob([data]));
      const link = document.createElement("a");
      link.href = url;
      const filename = `${variables.reportType}-report-${new Date().toISOString().split("T")[0]}.xlsx`;
      link.setAttribute("download", filename);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    },
  });

  return {
    getReportTypes,
    generateReport,
  };
};
