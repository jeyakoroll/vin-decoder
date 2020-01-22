import React, { useState, useEffect, useContext } from 'react'
import { Link, useHistory, useParams } from "react-router-dom";
import Context from '../context';

const ShowSpecificData = () => {
  const { state } = useContext(Context);
  const history = useHistory();
  const params = useParams();

  useEffect(() => {
    // const carExtendedData = await axios.get(`https://vpic.nhtsa.dot.gov/api/vehicles/decodevin/${value}?format=json`);
    console.log('state', state);
    // console.log('carExtendedData', carExtendedData);
  }, [])

  return (
    <div>
      ShowSpecificData
    </div>
  )
}

export default ShowSpecificData;