import React, { useState, useEffect, useContext } from 'react'
import { Descriptions, Radio, Button, Icon } from 'antd';
import { Link, useHistory } from "react-router-dom";
import Context from '../context';

const ShowFoundCar = () => {
  const { state: { carData } } = useContext(Context);
  const [size, setSize] = useState('default');
  const history = useHistory();

  useEffect(() => {
    if ( carData.length === 0 ) {
      history.push('/');
    }
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
          <Descriptions.Item 
            label={
              <Link to={`/variables/${car.VariableId}`}>
                {car.Variable}
              </Link>
            }
          >{car.Value}</Descriptions.Item>
        </Descriptions>
      ))}
    </div>
  )
}

export default ShowFoundCar;