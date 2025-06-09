import { API_URL } from "@/const";
import { useAxios } from "@/hooks/useAxios";
import { axiosGet } from "@/lib/axiosRes";
import { CategoriesType } from "@/type";

export const getCategories = (): {data: CategoriesType[] } => {
  const data = useAxios(API_URL + "categories")
  return data
  
}