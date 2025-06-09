import { API_URL } from "@/const";
import { axiosPost } from "@/lib/axiosRes";
import { ProductsType } from "@/type";

/** 
 * @description Get all products from API
 * @returns data, loading, error
*/

type AxioResType = {
  data: ProductsType[]
  loading: boolean
  error: null | boolean
}

export const useProduct = () => {
  const url = API_URL + "productsTest"


  const getProducts = () => {
     
  }

  const newProduct = (data: any) => {
    const res = axiosPost(url, data)
    return res
  }

  return {
    getProducts,
    newProduct
  }
}
