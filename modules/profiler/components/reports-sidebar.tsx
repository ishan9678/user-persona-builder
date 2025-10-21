'use client';

import { FileText, Trash2, Calendar, ExternalLink, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { ReportEntry } from '../types/report';

type ReportsSidebarProps = {
  reports: ReportEntry[];
  currentReportId?: string;
  isOpen: boolean;
  onClose: () => void;
  onSelectReport: (report: ReportEntry) => void;
  onDeleteReport: (id: string) => void;
};

export function ReportsSidebar({ reports, currentReportId, isOpen, onClose, onSelectReport, onDeleteReport }: ReportsSidebarProps) {

  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  const truncateUrl = (url: string, maxLength = 30) => {
    if (url.length <= maxLength) return url;
    return url.substring(0, maxLength) + '...';
  };

  if (reports.length === 0) return null;

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 h-screen w-80 bg-background border-r-4 border-black dark:border-white transition-transform duration-300 z-50 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Sidebar Content */}
        <div className="h-full flex flex-col">
          {/* Header */}
          <div className="p-4 border-b-2 border-black dark:border-white bg-primary text-primary-foreground flex items-center justify-between">
            <div>
              <h2 className="text-lg font-black uppercase">Reports</h2>
              <p className="text-xs opacity-90">{reports.length} saved</p>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="hover:bg-primary-foreground/20"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>

          {/* Reports List */}
          <div className="flex-1 overflow-y-auto p-3 space-y-2">
            {reports.map((report) => (
              <div
                key={report.id}
                className={`group relative p-3 border-2 border-black dark:border-white transition-all cursor-pointer ${
                  currentReportId === report.id
                    ? 'bg-primary text-primary-foreground shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)]'
                    : 'hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:hover:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)]'
                }`}
                onClick={() => {
                  onSelectReport(report);
                  onClose();
                }}
              >
                {/* Delete Button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    if (confirm('Delete this report?')) {
                      onDeleteReport(report.id);
                    }
                  }}
                  className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                  title="Delete report"
                >
                  <Trash2 className="h-4 w-4 hover:text-red-600" />
                </button>

                {/* Report Info */}
                <div className="pr-6">
                  <div className="flex items-start gap-2 mb-2">
                    <ExternalLink className="h-4 w-4 mt-0.5 flex-shrink-0" />
                    <p className="text-sm font-bold break-all line-clamp-2">
                      {truncateUrl(report.url, 35)}
                    </p>
                  </div>
                  
                  <div className="flex items-center gap-1 text-xs opacity-80">
                    <Calendar className="h-3 w-3" />
                    <span>{formatDate(report.timestamp)}</span>
                  </div>

                  <div className="mt-2 text-xs opacity-80">
                    <p>{report.reportData.userPersonas.length} personas</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </aside>
    </>
  );
}
