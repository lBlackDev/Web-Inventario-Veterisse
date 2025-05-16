import { ProductsProps } from "@/type";
import axios from "axios";

const api_url = "http://localhost:4000/" 

const getProducts = async (): Promise<ProductsProps['products']> => {
  return axios.get(api_url + "productsTest")
    .then((res) => res.data)
    .catch(() => {
      console.error("Error al obtener los productos")
      return []
    })
}

export {
  getProducts
}