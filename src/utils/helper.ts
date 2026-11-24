import { Dimensions, PixelRatio, Platform, StatusBar } from 'react-native';

export const { width, height } = Dimensions.get('window');

export const guidelineBaseWidth = 350;
export const guidelineBaseHeight = 812;

export const wp = (widthPercent: string | number) => {
  const elemWidth =
    typeof widthPercent === 'number' ? widthPercent : parseFloat(widthPercent);
  return PixelRatio.roundToNearestPixel((width * elemWidth) / 100);
};

// hp(80) -> 80% of height device screen
export const hp = (heightPercent: string | number) => {
  const elemHeight =
    typeof heightPercent === 'number'
      ? heightPercent
      : parseFloat(heightPercent);
  return PixelRatio.roundToNearestPixel((height * elemHeight) / 100);
};

// Use for fontSize
export const textScale = (fontSize: number, standardScreenHeight = 680) => {
  const standardLength = width > height ? width : height;
  const offset =
    width > height ? 0 : Platform.OS === 'ios' ? 78 : StatusBar.currentHeight;

  const deviceHeight =
    isIphoneXorAbove() || Platform.OS === 'android'
      ? standardLength - Number(offset)
      : standardLength;

  const heightPercent = (fontSize * deviceHeight) / standardScreenHeight;
  return Math.round(heightPercent);
};
export const isIphoneXorAbove = () => {
  return (
    Platform.OS === 'ios' &&
    !Platform.isPad &&
    !Platform.isTV &&
    (height === 812 ||
      width === 812 ||
      height === 896 ||
      width === 896 ||
      width === 390 ||
      height === 844 ||
      width === 390 ||
      height === 852 ||
      width === 428 ||
      height === 926 ||
      width === 428 ||
      height === 932)
  );
};
export const hs = (size: number) => (width / guidelineBaseWidth) * size;
export const vs = (size: number) => (height / guidelineBaseHeight) * size;
