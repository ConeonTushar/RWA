import React from 'react';
import { LOGIN_SCREEN, OTP_SCREEN } from './url';

export type SCREENPARAMS = {
  [LOGIN_SCREEN]: undefined;
  [OTP_SCREEN]: { mobile: string };
};

export const navigationRef: any = React.createRef();
