import { API_URL } from "@/const";
import { useAxios } from "@/hooks/useAxios";

export const getMovement = () => {
  const url = API_URL + "inventory/movements";

  return useAxios(url)
}