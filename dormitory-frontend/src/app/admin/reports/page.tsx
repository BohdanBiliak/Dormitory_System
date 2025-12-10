"use client";

import { ReportGenerator } from "@/components/admin/ReportGenerator.component";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart3, FileText, TrendingUp } from "lucide-react";
import { useLanguage } from "@/providers/language.provider";

export default function ReportsPage() {
  const {t} = useLanguage();
  
  return (
    <div className="container mx-auto py-8 space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">{t('reports.title')}</h1>
        <p className="text-muted-foreground mt-2">
          {t('reports.subtitle')}
        </p>
      </div>

      {/* Info Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{t('reports.infoCards.excelFormat')}</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <p className="text-xs text-muted-foreground">
              {t('reports.infoCards.excelDescription')}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{t('reports.infoCards.customFilters')}</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <p className="text-xs text-muted-foreground">
              {t('reports.infoCards.filtersDescription')}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{t('reports.infoCards.realTimeData')}</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <p className="text-xs text-muted-foreground">
              {t('reports.infoCards.realTimeDescription')}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Report Generator */}
      <ReportGenerator />

      {/* Available Reports Info */}
      <Card>
        <CardHeader>
          <CardTitle>{t('reports.availableReports.title')}</CardTitle>
          <CardDescription>
            {t('reports.availableReports.subtitle')}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="border-l-4 border-blue-500 pl-4">
              <h4 className="font-semibold">{t('reports.availableReports.users.title')}</h4>
              <p className="text-sm text-muted-foreground">
                {t('reports.availableReports.users.description')}
              </p>
            </div>

            <div className="border-l-4 border-green-500 pl-4">
              <h4 className="font-semibold">{t('reports.availableReports.dormitories.title')}</h4>
              <p className="text-sm text-muted-foreground">
                {t('reports.availableReports.dormitories.description')}
              </p>
            </div>

            <div className="border-l-4 border-purple-500 pl-4">
              <h4 className="font-semibold">{t('reports.availableReports.rooms.title')}</h4>
              <p className="text-sm text-muted-foreground">
                {t('reports.availableReports.rooms.description')}
              </p>
            </div>

            <div className="border-l-4 border-orange-500 pl-4">
              <h4 className="font-semibold">{t('reports.availableReports.bookings.title')}</h4>
              <p className="text-sm text-muted-foreground">
                {t('reports.availableReports.bookings.description')}
              </p>
            </div>

            <div className="border-l-4 border-red-500 pl-4">
              <h4 className="font-semibold">{t('reports.availableReports.payments.title')}</h4>
              <p className="text-sm text-muted-foreground">
                {t('reports.availableReports.payments.description')}
              </p>
            </div>

            <div className="border-l-4 border-yellow-500 pl-4">
              <h4 className="font-semibold">{t('reports.availableReports.maintenance.title')}</h4>
              <p className="text-sm text-muted-foreground">
                {t('reports.availableReports.maintenance.description')}
              </p>
            </div>

            <div className="border-l-4 border-pink-500 pl-4">
              <h4 className="font-semibold">{t('reports.availableReports.announcements.title')}</h4>
              <p className="text-sm text-muted-foreground">
                {t('reports.availableReports.announcements.description')}
              </p>
            </div>

            <div className="border-l-4 border-indigo-500 pl-4">
              <h4 className="font-semibold">{t('reports.availableReports.confirmations.title')}</h4>
              <p className="text-sm text-muted-foreground">
                {t('reports.availableReports.confirmations.description')}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
