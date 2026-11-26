export type FlatPaymentStatus = 'Paid' | 'Part paid' | 'Due' | 'Overdue';

export interface MoneyStatItem {
  id: string;
  label: string;
  value: string;
}

export interface MoneyQuickActionItem {
  id: string;
  title: string;
  subtitle: string;
  iconName?: string;
  onPress?: () => void;
}

export interface FlatDueItem {
  id: string;
  flatNumber: string;
  residentName: string;
  status: FlatPaymentStatus;
  amountDue: string;
  outstandingLabel: string;
  isOverdue?: boolean;
  vehicleNumber?: string;
}

export interface MonthlyLedgerEntry {
  id: string;
  month: string;
  status: FlatPaymentStatus;
  maintenanceCharge: string;
  paymentReceived: string;
  balanceLabel: string;
  balanceAmount: string;
}

export type ExpenseStatus = 'Pending' | 'Approved' | 'Rejected';

export interface ExpenseRecordItem {
  id: string;
  title: string;
  category: string;
  billDate: string;
  amount: string;
  status: ExpenseStatus;
  paidTo: string;
  paymentMode: string;
  submittedBy: string;
  invoiceName?: string;
}
