import React, { useState, useEffect, useContext } from 'react'
import { Descriptions, Radio, Button, Icon } from 'antd';
import { Link, useHistory, useParams } from "react-router-dom";
import axios from 'axios';
import find from 'lodash/find';
import Context from '../context';

const ShowSpecificData = () => {
  const { state } = useContext(Context);
  const [size, setSize] = useState('default');
  const [variableDescr, setVariableDeskr] = useState("");
  const { variable } = useParams();

  useEffect(() => {
    getSpecificDataOfVariable();
  }, [])

  const getSpecificDataOfVariable = async () => {
    const {data: {Results}} = await axios.get(`https://vpic.nhtsa.dot.gov/api/vehicles/getvehiclevariablelist?format=json`);
    const getSpecificData = find(Results, {ID: parseInt(variable)});
    if (getSpecificData === undefined) {
      setVariableDeskr('There is no description for this variable!');
      return;
    };
    setVariableDeskr(getSpecificData.Description);
  }

  const handleSize = ev => setSize(ev.target.value);

  return (
    <div className="show_car-box">
      <Link to="/variables">
        <Button className="show_car-backward" type="primary">
          <Icon type="left" />
          Backward
        </Button>
      </Link>
      <Radio.Group onChange={handleSize} value={size}>
        <Radio value="default">default</Radio>
        <Radio value="small">small</Radio>
      </Radio.Group>
      <Descriptions 
        className="show_car-item" 
        bordered 
        column={2} 
        size={size}
      >
        <Descriptions.Item label="Desription" >
          <span dangerouslySetInnerHTML={{__html: variableDescr}} />
        </Descriptions.Item>
      </Descriptions>
    </div>
  )
}

export default ShowSpecificData;