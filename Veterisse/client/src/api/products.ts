import { useAxiosGet } from "@/hooks/useAxios";

const api_url = "http://localhost:4000/" 

const dataProducts = useAxiosGet(api_url + "productsTest")
export const getProducts = () => {
  const data = dataProducts.read()

  return { products: Array.isArray(data.response) ? data.response : [], error: data.status }
}