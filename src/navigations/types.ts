import React from 'react';
import {
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
} from './url';
import type { ApprovalItemData } from '../components/approvals';

export interface RequestMoreInfoScreenParams {
  item?: ApprovalItemData;
  mode?: 'request_info' | 'reject';
  title?: string;
  buttonLabel?: string;
}

export type SCREENPARAMS = {
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
};

export const navigationRef: any = React.createRef();
