import axios from "axios";
import { URL_API } from "@/const";

export const getCategories = async () => {
  return axios.get(URL_API + "categories")
    .then(res => res.data)
    .catch(err => console.log(err))
}