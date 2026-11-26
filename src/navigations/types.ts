import React from 'react';
import {
  SPLASH_SCREEN,
  LOGIN_SCREEN,
  OTP_SCREEN,
  SELECT_SOCIETY_SCREEN,
  PROFILE_SCREEN,
  SOCIETY_BASICS_SCREEN,
  SOCIETY_ADDRESS_SCREEN,
  SOCIETY_STRUCTURE_SCREEN,
  SOCIETY_CONTACT_SCREEN,
  SOCIETY_DOCUMENTS_SCREEN,
  MAIN_TAB_NAVIGATOR,
  NOTIFICATIONS_SCREEN,
  SOS_MONITOR_SCREEN,
  RESIDENT_REQUEST_DETAIL_SCREEN,
  REQUEST_MORE_INFO_SCREEN,
  VENDOR_REQUEST_DETAIL_SCREEN,
  PERMISSION_REQUEST_DETAIL_SCREEN,
  BOOKING_APPROVAL_DETAIL_SCREEN,
  COMPLAINT_DETAIL_SCREEN,
  ASSIGN_COMPLAINT_SCREEN,
  UPDATE_COMPLAINT_SCREEN,
  COMPLAINT_SUMMARY_SCREEN,
  DUES_BY_FLAT_SCREEN,
  FLAT_LEDGER_SCREEN,
  SEND_REMINDERS_SCREEN,
  RECORD_PAYMENT_SCREEN,
  ADD_CHARGE_OR_WAIVER_SCREEN,
  EXPENSE_SUMMARY_SCREEN,
  ADD_EXPENSE_SCREEN,
  EXPENSE_APPROVAL_SCREEN,
  REPORTS_SUMMARY_SCREEN,
} from './url';
import type { ApprovalItemData } from '../components/approvals';
import type { ComplaintItemData } from '../components/complaints';
import type { ExpenseRecordItem, FlatDueItem } from '../components/money';

export interface RequestMoreInfoScreenParams {
  item?: ApprovalItemData;
  mode?: 'request_info' | 'reject';
  title?: string;
  buttonLabel?: string;
}

export type SCREENPARAMS = {
  [SPLASH_SCREEN]: undefined;
  [LOGIN_SCREEN]: undefined;
  [OTP_SCREEN]: { mobile: string };
  [SELECT_SOCIETY_SCREEN]: undefined;
  [PROFILE_SCREEN]: undefined;
  [SOCIETY_BASICS_SCREEN]: undefined;
  [SOCIETY_ADDRESS_SCREEN]: undefined;
  [SOCIETY_STRUCTURE_SCREEN]: undefined;
  [SOCIETY_CONTACT_SCREEN]: undefined;
  [SOCIETY_DOCUMENTS_SCREEN]: undefined;
  [MAIN_TAB_NAVIGATOR]: undefined;
  [NOTIFICATIONS_SCREEN]: undefined;
  [SOS_MONITOR_SCREEN]: { alertId?: string } | undefined;
  [RESIDENT_REQUEST_DETAIL_SCREEN]: { item?: ApprovalItemData } | undefined;
  [REQUEST_MORE_INFO_SCREEN]: RequestMoreInfoScreenParams | undefined;
  [VENDOR_REQUEST_DETAIL_SCREEN]: { item?: ApprovalItemData } | undefined;
  [PERMISSION_REQUEST_DETAIL_SCREEN]: { item?: ApprovalItemData } | undefined;
  [BOOKING_APPROVAL_DETAIL_SCREEN]: { item?: ApprovalItemData } | undefined;
  [COMPLAINT_DETAIL_SCREEN]: { item?: ComplaintItemData } | undefined;
  [ASSIGN_COMPLAINT_SCREEN]: { item?: ComplaintItemData } | undefined;
  [UPDATE_COMPLAINT_SCREEN]: { item?: ComplaintItemData } | undefined;
  [COMPLAINT_SUMMARY_SCREEN]: undefined;
  [DUES_BY_FLAT_SCREEN]: undefined;
  [FLAT_LEDGER_SCREEN]: { flat?: FlatDueItem } | undefined;
  [SEND_REMINDERS_SCREEN]:
    | { selectedCount?: number; overdueCount?: number }
    | undefined;
  [RECORD_PAYMENT_SCREEN]: { flat?: FlatDueItem } | undefined;
  [ADD_CHARGE_OR_WAIVER_SCREEN]: { flat?: FlatDueItem } | undefined;
  [EXPENSE_SUMMARY_SCREEN]: undefined;
  [ADD_EXPENSE_SCREEN]: undefined;
  [EXPENSE_APPROVAL_SCREEN]: { expense?: ExpenseRecordItem } | undefined;
  [REPORTS_SUMMARY_SCREEN]: undefined;
};

export const navigationRef: any = React.createRef();
