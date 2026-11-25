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
} from './url';

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
};

export const navigationRef: any = React.createRef();
