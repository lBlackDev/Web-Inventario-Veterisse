"use client"
import axios from "axios";
import { useState, useEffect } from "react";

/** 
* @param url - string
* @param method: "GET" | "POST" | "PUT" | "DELETE" = "GET"
* @returns data, loading, error
*/

export function useAxios(
  url:string, 
  method: "GET" | "POST" | "PUT" | "DELETE" = "GET",
  body: object = {}
) {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<null | boolean>(null);

  useEffect(() => {
    setLoading(true);
    axios(url, {method: method, data: body})
      .then((res) => setData(res.data))
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, []);

  return { data, loading, error };
}