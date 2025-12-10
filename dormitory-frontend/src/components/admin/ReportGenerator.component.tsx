"use client";

import { useState } from "react";
import { useReports } from "@/hooks/reports.hook";
import { useGetActiveDormitories } from "@/hooks/dormitories.hook";
import { GenerateReportDto, ReportType } from "@/types/reports.types";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/Input.components";
import { Loader2, Download, FileSpreadsheet, CheckCircle2, XCircle } from "lucide-react";
import { Dormitory } from "@/types/dormitories.types";
import { useLanguage } from "@/providers/language.provider";

export function ReportGenerator() {
  const {t} = useLanguage();
  const { getReportTypes, generateReport } = useReports();
  const { data: dormitoriesResponse } = useGetActiveDormitories();

  const [formData, setFormData] = useState<GenerateReportDto>({
    reportType: ReportType.USERS,
  });

  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");

  const reportTypes = getReportTypes.data?.reportTypes || [];
  const dormitories: Dormitory[] = dormitoriesResponse?.data || [];

  const selectedReportType = reportTypes.find(
    (rt) => rt.value === formData.reportType
  );

  const handleGenerate = async () => {
    try {
      setError("");
      setSuccess("");
      await generateReport.mutateAsync(formData);
      setSuccess(t('reports.messages.generatedAndDownloaded'));
      setTimeout(() => setSuccess(""), 5000);
    } catch (error: any) {
      setError(error.response?.data?.message || t('reports.messages.failed'));
      setTimeout(() => setError(""), 5000);
    }
  };

  const hasFilter = (filterName: string) => {
    return selectedReportType?.availableFilters.includes(filterName);
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center gap-2">
          <FileSpreadsheet className="h-6 w-6" />
          <CardTitle>{t('reports.generator.title')}</CardTitle>
        </div>
        <CardDescription>
          {t('reports.generator.description')}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Success/Error Messages */}
        {success && (
          <div className="flex items-center gap-2 p-3 bg-green-50 border border-green-200 rounded-md text-green-800">
            <CheckCircle2 className="h-5 w-5" />
            <span className="text-sm">{success}</span>
          </div>
        )}
        
        {error && (
          <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-md text-red-800">
            <XCircle className="h-5 w-5" />
            <span className="text-sm">{error}</span>
          </div>
        )}

        {/* Report Type Selection */}
        <div className="space-y-2">
          <Label htmlFor="reportType">{t('reports.generator.reportTypeRequired')}</Label>
          <Select
            value={formData.reportType}
            onValueChange={(value: string) =>
              setFormData({ reportType: value as ReportType })
            }
          >
            <SelectTrigger id="reportType">
              <SelectValue placeholder={t('reports.generator.selectReportType')} />
            </SelectTrigger>
            <SelectContent>
              {reportTypes.map((type) => (
                <SelectItem key={type.value} value={type.value}>
                  {type.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {selectedReportType && (
            <p className="text-sm text-gray-500">
              {selectedReportType.description}
            </p>
          )}
        </div>

        {/* Filters Section */}
        <div className="space-y-4 border-t pt-4">
          <h3 className="text-sm font-medium">{t('reports.generator.filtersSection')}</h3>

          <div className="grid gap-4 md:grid-cols-2">
            {/* Date Range Filters */}
            {hasFilter("startDate") && (
              <div className="space-y-2">
                <Label htmlFor="startDate">{t('reports.startDate')}</Label>
                <Input
                  id="startDate"
                  type="date"
                  value={formData.startDate || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, startDate: e.target.value })
                  }
                />
              </div>
            )}

            {hasFilter("endDate") && (
              <div className="space-y-2">
                <Label htmlFor="endDate">{t('reports.endDate')}</Label>
                <Input
                  id="endDate"
                  type="date"
                  value={formData.endDate || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, endDate: e.target.value })
                  }
                />
              </div>
            )}

            {/* Dormitory Filter */}
            {hasFilter("dormitoryId") && dormitories.length > 0 && (
              <div className="space-y-2">
                <Label htmlFor="dormitoryId">{t('reports.dormitory')}</Label>
                <Select
                  value={formData.dormitoryId || "all"}
                  onValueChange={(value: string) =>
                    setFormData({
                      ...formData,
                      dormitoryId: value === "all" ? undefined : value,
                    })
                  }
                >
                  <SelectTrigger id="dormitoryId">
                    <SelectValue placeholder={t('reports.generator.allDormitories')} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">{t('reports.generator.allDormitories')}</SelectItem>
                    {dormitories.map((dorm) => (
                      <SelectItem key={dorm.id} value={dorm.id}>
                        {dorm.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}

            {/* Role Filter */}
            {hasFilter("role") && (
              <div className="space-y-2">
                <Label htmlFor="role">{t('common.role')}</Label>
                <Select
                  value={formData.role || "all"}
                  onValueChange={(value: string) =>
                    setFormData({
                      ...formData,
                      role: value === "all" ? undefined : value,
                    })
                  }
                >
                  <SelectTrigger id="role">
                    <SelectValue placeholder={t('reports.generator.allRoles')} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">{t('reports.generator.allRoles')}</SelectItem>
                    <SelectItem value="Resident">{t('reports.generator.roles.resident')}</SelectItem>
                    <SelectItem value="SignedInUser">{t('reports.generator.roles.signedInUser')}</SelectItem>
                    <SelectItem value="Regular">{t('reports.generator.roles.regular')}</SelectItem>
                    <SelectItem value="Admin">{t('reports.generator.roles.admin')}</SelectItem>
                    <SelectItem value="SuperAdmin">{t('reports.generator.roles.superAdmin')}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}

            {/* Status Filter */}
            {hasFilter("status") && (
              <div className="space-y-2">
                <Label htmlFor="status">{t('common.status')}</Label>
                <Select
                  value={formData.status || "all"}
                  onValueChange={(value: string) =>
                    setFormData({
                      ...formData,
                      status: value === "all" ? undefined : value,
                    })
                  }
                >
                  <SelectTrigger id="status">
                    <SelectValue placeholder={t('reports.generator.allStatuses')} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">{t('reports.generator.allStatuses')}</SelectItem>
                    {formData.reportType === ReportType.DORMITORIES && (
                      <>
                        <SelectItem value="ACTIVE">{t('reports.generator.statuses.active')}</SelectItem>
                        <SelectItem value="INACTIVE">{t('reports.generator.statuses.inactive')}</SelectItem>
                      </>
                    )}
                    {formData.reportType === ReportType.ROOMS && (
                      <>
                        <SelectItem value="OCCUPIED">{t('reports.generator.statuses.occupied')}</SelectItem>
                        <SelectItem value="AVAILABLE">{t('reports.generator.statuses.available')}</SelectItem>
                      </>
                    )}
                    {(formData.reportType === ReportType.BOOKINGS ||
                      formData.reportType === ReportType.CONFIRMATIONS) && (
                      <>
                        <SelectItem value="PENDING">{t('reports.generator.statuses.pending')}</SelectItem>
                        <SelectItem value="APPROVED">{t('reports.generator.statuses.approved')}</SelectItem>
                        <SelectItem value="REJECTED">{t('reports.generator.statuses.rejected')}</SelectItem>
                      </>
                    )}
                    {formData.reportType === ReportType.PAYMENTS && (
                      <>
                        <SelectItem value="PENDING">{t('reports.generator.statuses.pending')}</SelectItem>
                        <SelectItem value="COMPLETED">{t('reports.generator.statuses.completed')}</SelectItem>
                        <SelectItem value="FAILED">{t('reports.generator.statuses.failed')}</SelectItem>
                        <SelectItem value="REFUNDED">{t('reports.generator.statuses.refunded')}</SelectItem>
                      </>
                    )}
                    {formData.reportType === ReportType.MAINTENANCE && (
                      <>
                        <SelectItem value="PENDING">{t('reports.generator.statuses.pending')}</SelectItem>
                        <SelectItem value="IN_PROGRESS">{t('reports.generator.statuses.inProgress')}</SelectItem>
                        <SelectItem value="COMPLETED">{t('reports.generator.statuses.completed')}</SelectItem>
                        <SelectItem value="CANCELLED">{t('reports.generator.statuses.cancelled')}</SelectItem>
                      </>
                    )}
                  </SelectContent>
                </Select>
              </div>
            )}
          </div>
        </div>

        {/* Generate Button */}
        <div className="flex justify-end gap-2 border-t pt-4">
          <Button
            onClick={() =>
              setFormData({ reportType: formData.reportType })
            }
            variant="secondary"
            disabled={generateReport.isPending}
          >
            {t('reports.actions.clearFilters')}
          </Button>
          <Button
            onClick={handleGenerate}
            disabled={generateReport.isPending || getReportTypes.isLoading}
          >
            {generateReport.isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                {t('reports.messages.generating')}
              </>
            ) : (
              <>
                <Download className="mr-2 h-4 w-4" />
                {t('reports.actions.generate')} {t('reports.reportType')}
              </>
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
