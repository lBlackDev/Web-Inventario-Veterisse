import axios from "axios";
import { URL_API } from "@/const";

export const getMovement = async () => {
  return axios.get(URL_API + "inventory/movements")
    .then(res => res.data)
    .catch(err => console.log(err))
}