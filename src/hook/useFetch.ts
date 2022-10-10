
/*
import { useEffect, useState } from "react";
import axios from 'axios'

export function useFetch<T = unknown>(url: string){

    const [data, setData] =useState<T | null>(null)
    const [isFetching, setIsFetching] = useState(true);

    useEffect(() => {
        axios.get(url)
        .then(Response=>{
          setData(Response.data);
        })
        .finally(() => {
            setIsFetching(false);
        })
      },[])
    
    return { data, isFetching }

}

*/