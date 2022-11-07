import { RequestResponse } from './IRequestResponse.interface';

export const buildResponseSucess = ({
  data,
  state,
  code,
  message,
  totalRecords = 0,
}: RequestResponse): RequestResponse => {
  const requestResponse: RequestResponse = {
    data: data,
    state: state ?? true,
    code: code || 200,
    message:
      message && message['message'] ? message['message'] : message || 'sucess',
    totalRecords,
  };
  return requestResponse;
};

export const buildResponseFail = ({
  data,
  state,
  code,
  message,
}: RequestResponse): RequestResponse => {
  const requestResponse: RequestResponse = {
    data: data,
    state: state ?? false,
    code: code || 400,
    message: message || 'fail',
  };
  return requestResponse;
};
