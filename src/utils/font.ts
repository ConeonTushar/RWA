import { textScale } from './helper';

export const FONTS = {
  REGULAR_THIN: 'Outfit-Thin',
  REGULAR_OUTFIT: 'Outfit-Regular',
  MEDIUM_OUTFIT: 'Outfit-Medium',
  SEMI_OUTFIT: 'Outfit-SemiBold',
  BOLD_OUTFIT: 'Outfit-Bold',
  EXTRA_BOLD_OUTFIT: 'Outfit-ExtraBold',
  BLACK_OUTFIT: 'Outfit-Black',
};

export const FONTSIZE = {
  h1: textScale(48),
  h2: textScale(32),
  h3: textScale(30),
  h4: textScale(22),
  h5: textScale(20),
  l1: textScale(18),
  l2: textScale(16),
  small: textScale(14),
  minSmall: textScale(13),
  tiny: textScale(12),
  minTiny: textScale(11),
  xsmall: textScale(10),
  xxsmall: textScale(9),
  vtiny: textScale(8),
};

export const COLORS = {
  primary: '#2e4c7e',
  secondary: '#075DA8',
  lightPrimary: '#5186DE',
  white: '#FFFFFF',
  black: '#000000',
  red: '#E53935',
  //inputbox
  lightBlack: '#333',
  lightBlack1: '#222',
  grey: '#DDD',

  // Society theme colors
  greenPrimary: '#0B6A4C',
  greenTitle: '#0F6B4E',
  darkBtn: '#1D1B20',
  darkText: '#0F0F11',
  textSecondary: '#6B7280',
  inputBorder: '#E5E7EB',
  placeholder: '#9CA3AF',
  badgeGreenBg: '#E8F8EE',
  badgeGreenText: '#16A34A',
  avatarBg: '#D9D9D9',
  cardBorder: '#E5E7EB',
  cardBorderSelected: '#0F0F11',
  greyMoon: '#E5E7EB',
  lightGrey: '#F9FAFB',
};
