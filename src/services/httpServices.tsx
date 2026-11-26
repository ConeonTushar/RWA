import AsyncStorage from '@react-native-async-storage/async-storage';
import axios, { AxiosError } from 'axios';
import Config from 'react-native-config';
import { RWA_USER_TOKEN_KEY } from '../utils/constants';
import { showToast } from './helper';

export const URL = Config?.BASE_URL || '';

interface CustomHeadersProps {
  [key: string]: string | number | null;
}

interface ErrorResponse {
  message?: string;
  status_code?: number;
  statusCode?: number;
}

const getAccessToken = async () => {
  return AsyncStorage.getItem(RWA_USER_TOKEN_KEY);
};

const handleError = async (error: unknown) => {
  const axiosError = error as AxiosError;
  const errorData = axiosError.response?.data as ErrorResponse;

  if (errorData?.status_code === 403 || errorData?.statusCode === 403) {
    await AsyncStorage.clear();
    showToast({
      type: 'info',
      title: 'Session expired. Please login again.',
    });
  }

  return errorData?.message || 'Something went wrong';
};

const buildUrl = (base: string, path?: string) => {
  if (!path) return base;
  return `${base.replace(/\/$/, '')}/${path.replace(/^\//, '')}`;
};

const buildHeaders = async (
  customHeaders?: CustomHeadersProps,
  allowCallWithoutToken?: boolean,
) => {
  const token = await getAccessToken();

  return {
    accept: 'application/json',
    'Accept-Language': 'en',
    ...(allowCallWithoutToken ? {} : { 'x-access-token': token ?? '' }),
    ...customHeaders,
  };
};

/* ========================= GET ========================= */
export const getData = async ({
  url,
  customHeaders,
  allowCallWithoutToken,
  params,
}: {
  url?: string;
  customHeaders?: CustomHeadersProps;
  allowCallWithoutToken?: boolean;
  params?: any;
}) => {
  try {
    const finalUrl = buildUrl(URL, url);
    console.log('GET URL -->', finalUrl, url);

    const response = await axios.get(finalUrl, {
      headers: await buildHeaders(customHeaders, allowCallWithoutToken),
      params,
    });

    return response.data;
  } catch (error) {
    console.log(error);
    return handleError(error);
  }
};

/* ========================= POST ========================= */
export const postData = async ({
  url,
  body,
  customHeaders,
  allowCallWithoutToken,
}: {
  url: string;
  body: any;
  customHeaders?: CustomHeadersProps;
  allowCallWithoutToken?: boolean;
}) => {
  try {
    const finalUrl = buildUrl(URL, url);
    console.log('POST URL -->', finalUrl, body);

    const response = await axios.post(finalUrl, body, {
      headers: await buildHeaders(customHeaders, allowCallWithoutToken),
    });

    return response.data;
  } catch (error) {
    return handleError(error);
  }
};

/* ========================= PUT ========================= */
export const putData = async ({
  url,
  body,
  customHeaders,
  allowCallWithoutToken,
}: {
  url: string;
  body: any;
  customHeaders?: CustomHeadersProps;
  allowCallWithoutToken?: boolean;
}) => {
  try {
    const finalUrl = buildUrl(URL, url);
    console.log('PUT URL -->', finalUrl);

    const response = await axios.put(finalUrl, body, {
      headers: await buildHeaders(customHeaders, allowCallWithoutToken),
    });

    return response.data;
  } catch (error) {
    return handleError(error);
  }
};

/* ========================= PATCH ========================= */
export const patchData = async ({
  url,
  body,
  customHeaders,
  allowCallWithoutToken,
}: {
  url: string;
  body: any;
  customHeaders?: CustomHeadersProps;
  allowCallWithoutToken?: boolean;
}) => {
  try {
    const finalUrl = buildUrl(URL, url);
    console.log('PATCH URL -->', finalUrl);

    const response = await axios.patch(finalUrl, body, {
      headers: await buildHeaders(customHeaders, allowCallWithoutToken),
    });

    return response.data;
  } catch (error) {
    return handleError(error);
  }
};

/* ========================= DELETE ========================= */
export const deleteData = async ({
  url,
  customHeaders,
  allowCallWithoutToken,
}: {
  url: string;
  customHeaders?: CustomHeadersProps;
  allowCallWithoutToken?: boolean;
}) => {
  try {
    const finalUrl = buildUrl(URL, url);
    console.log('DELETE URL -->', finalUrl);

    const response = await axios.delete(finalUrl, {
      headers: await buildHeaders(customHeaders, allowCallWithoutToken),
    });

    return response.data;
  } catch (error) {
    return handleError(error);
  }
};
