export type ComplaintFilterCategory = 'inside' | 'expected' | 'waiting';

export type ComplaintStatusVariant = 'in_progress' | 'open' | 'resolved' | 'overdue';

export interface ComplaintTimelineStep {
  step: number;
  title: string;
  timestamp: string;
  actor: string;
}

export interface ComplaintCommentItem {
  id: string;
  type: 'internal' | 'resident';
  author: string;
  timestamp: string;
  message: string;
}

export interface ComplaintSlaItem {
  label: string;
  statusLabel: string;
  statusVariant: 'success' | 'overdue';
  progress: number; // 0 to 1
  caption: string;
}

export interface ComplaintItemData {
  id: string;
  ticketId: string;
  title: string;
  category: string;
  location: string;
  flat: string;
  assignedTo: string;
  statusLabel: string;
  statusVariant: ComplaintStatusVariant;
  overdueLabel?: string;
  reportedText: string;
  filterCategory: ComplaintFilterCategory;
  description: string;
  reportedBy: string;
  visibility: string;
  upvotes: number;
  mediaCount: number;
  slaMetrics: ComplaintSlaItem[];
  timeline: ComplaintTimelineStep[];
  comments: ComplaintCommentItem[];
}
