import Toast from 'react-native-toast-message';

export function isValidObject(obj: any): boolean {
  return obj !== null && obj !== undefined && Object.keys(obj).length >= 1;
}

export function isValidString(str: string | null | undefined): boolean {
  return typeof str === 'string' && str.trim().length > 0;
}

export function isValidArray<T>(arr: T[]): boolean {
  return arr && typeof arr === 'object' && Array.isArray(arr) && arr.length > 0;
}

type ToastType = 'success' | 'error' | 'info' | 'warning';
let toastIdCounter = 0;

export const showToast = ({
  type = 'info',
  title = '',
  message = '',
  position = 'top',
  duration = 3500,
  stack = true,
}: {
  type: ToastType;
  title: string;
  message?: string;
  position?: 'top' | 'bottom';
  duration?: number;
  stack?: boolean;
}): void => {
  const toastId = stack ? `${type}-${Date.now()}-${toastIdCounter++}` : type;

  Toast.show({
    type,
    text1: title,
    text2: message,
    position,
    visibilityTime: duration,
    bottomOffset: 50,
    topOffset: 50,
    props: {
      toastId,
    },
  });
};

export function isValidJSON(text: any) {
  if (typeof text !== 'string') {
    return false;
  }
  try {
    JSON.parse(text);
    return true;
  } catch {
    return false;
  }
}
