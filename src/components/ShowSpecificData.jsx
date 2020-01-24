import React, { useState, useEffect } from 'react'
import { Descriptions, Radio, Button, Icon } from 'antd';
import { Link, useParams } from "react-router-dom";
import { requestSelectedVariable } from '../api';

const ShowSpecificData = () => {
  const [size, setSize] = useState('default');
  const [variableDescr, setVariableDeskr] = useState("");
  const { variable } = useParams();

  useEffect(() => {
    getSpecificDataOfVariable();
  }, [])

  const getSpecificDataOfVariable = async () => {
    const getSpecificData = await requestSelectedVariable(`/api/vehicles/getvehiclevariablelist?format=json`, variable);

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