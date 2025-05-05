import axios from "axios";

const api_url = "http://localhost:4000/" 

const getProducts = async () => {
  return axios.get(api_url + "productos")
    .then((res) => res.data)
}

export {
  getProducts
}