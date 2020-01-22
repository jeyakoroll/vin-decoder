import React, { useState, useEffect, useContext } from 'react'
import { Descriptions, Radio, Button, Icon } from 'antd';
import { Link, useHistory } from "react-router-dom";
import Context from '../context';

const ShowFoundCar = () => {
  const [size, setSize] = useState('default');
  const { state: { carData } } = useContext(Context);
  const history = useHistory();

  useEffect(() => {
    if ( Object.entries(carData).length === 0 && carData.constructor === Object ) {
      // history.push('/');
    }
    console.log('state', carData)
  }, []);

  const handleSize = ev => setSize(ev.target.value);

  return (
    <div className="show_car-box">
      <Link to="/">
        <Button className="show_car-backward" type="primary">
          <Icon type="left" />
          Backward
        </Button>
      </Link>
      <Radio.Group onChange={handleSize} value={size}>
        <Radio value="default">default</Radio>
        <Radio value="small">small</Radio>
      </Radio.Group>
      {carData.map(car => (
        <Descriptions 
          key={car.Value}
          className="show_car-item" 
          bordered 
          column={2} 
          size={size}
        >
          <Descriptions.Item label={car.Variable}>{car.Value}</Descriptions.Item>
        </Descriptions>
      ))}
    </div>
  )
}

export default ShowFoundCar;