import axios, { AxiosResponse } from "axios";
import { STATUS } from "@/const";

// Implementación correcta sin usar hooks en funciones regulares
const createSuspender = (promise: Promise<AxiosResponse>) => {
  let status = STATUS.PENDING;
  let response: any;

  const suspender = promise
    .then((res) => {
      status = STATUS.OK;
      response = res.data;
    })
    .catch((err) => {
      status = STATUS.ERROR;
      response = err;
    });

  const read = () => {
    switch (status) {
      case STATUS.PENDING:
        throw suspender;
      case STATUS.ERROR:
        throw response;
      default:
        return response;
    }
  };

  return { read };
};

export function axiosGet(url:string, ...args:any) {
  const promise: Promise<AxiosResponse> = axios.get(url, ...args)
    .then(res => res)
  return createSuspender(promise);
}

export function axiosPost(url:string, data: object) {
  const promise: Promise<AxiosResponse> = axios.post(url, data)
   .then(res => res)
  return createSuspender(promise);
}