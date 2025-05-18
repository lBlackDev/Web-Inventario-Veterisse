import axios, { AxiosResponse } from "axios";
import { STATUS } from "@/const";

const getSuspender = (promise: Promise<AxiosResponse>) => {
  let status = STATUS.PENDING;
  let response: AxiosResponse<object>;

  const suspender = promise.then(
    (res) => {
      status = res.statusText;
      response = res.data;
    },
    (err) => {
      status = STATUS.ERROR;
      response = err;
    }
  );

  const read = () => {
    switch (status) {
      case STATUS.PENDING:
        throw suspender;
      case STATUS.ERROR:
        return {
          status,
          response
        };
      default:
        return {
          status: STATUS.OK,
          response
        };
    }
  };

  return { read };
};

export function useAxiosGet(url:string) {

  const promise:Promise<AxiosResponse> = axios.get(url)
    .then((res) => (res))

  return getSuspender(promise);
}