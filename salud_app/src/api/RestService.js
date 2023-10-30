import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Alert } from 'react-native';

//Get List Sheds
const useSheds = (fecha, region) => {
    const [sheds, setSheds] = useState([]);

    //const serverUrl = 'http://192.168.0.102:3000';
    const serverUrl = 'http://192.168.1.5:3000';

    const getSheds = async () => {
        try {
          const url = `${serverUrl}/api/registros/${fecha}/${region}`;
          const response = await axios.get(url);
          setSheds(response.data);
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getSheds();
    }, [])
    
    //console.log('3. sheds', sheds);
    return sheds;
}


const apiRest = {
  useSheds,
}

export default apiRest;