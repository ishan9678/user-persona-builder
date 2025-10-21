import type { ProductProfile, CustomerProfile, UserPersona } from '@/modules/llm/types';

// Types
export type ReportEntry = {
  id: string;
  url: string;
  timestamp: number;
  reportData: {
    productProfile: ProductProfile;
    customerProfile: CustomerProfile;
    userPersonas: UserPersona[];
  };
};

export type ReportStorage = {
  reports: ReportEntry[];
};

// Constants
const STORAGE_KEY = 'user-persona-reports';
const MAX_REPORTS = 10; // Keep only the last 10 reports

// Helper Functions

/**
 * Get all reports from localStorage
 */
export function getReports(): ReportEntry[] {
  if (typeof window === 'undefined') return [];
  
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return [];
    
    const storage: ReportStorage = JSON.parse(stored);
    return storage.reports || [];
  } catch (error) {
    console.error('Error reading reports from localStorage:', error);
    return [];
  }
}

/**
 * Save a new report to localStorage
 */
export function saveReport(report: ReportEntry): void {
  if (typeof window === 'undefined') return;
  
  try {
    const reports = getReports();
    
    // Add new report at the beginning
    const updatedReports = [report, ...reports];
    
    // Keep only MAX_REPORTS
    const trimmedReports = updatedReports.slice(0, MAX_REPORTS);
    
    const storage: ReportStorage = { reports: trimmedReports };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(storage));
  } catch (error) {
    console.error('Error saving report to localStorage:', error);
  }
}

/**
 * Delete a report from localStorage
 */
export function deleteReport(id: string): void {
  if (typeof window === 'undefined') return;
  
  try {
    const reports = getReports();
    const filteredReports = reports.filter(report => report.id !== id);
    
    const storage: ReportStorage = { reports: filteredReports };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(storage));
  } catch (error) {
    console.error('Error deleting report from localStorage:', error);
  }
}

/**
 * Clear all reports from localStorage
 */
export function clearAllReports(): void {
  if (typeof window === 'undefined') return;
  
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error('Error clearing reports from localStorage:', error);
  }
}
