import axios from "axios";
import { useEffect, useState } from "react";


export const useFetch = (endpoint) => {

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchData = async()=>{
        try{
          setLoading(true);
          const response =  await axios.get(endpoint);
          setLoading(false);
          setData(response.data);
          // console.log(response.data);
        }catch(error){
           console.log('Error',error);
        }
      }
   
      useEffect(()=>{
          fetchData();
      },[])

      return {data, loading};
}