import React, { useState, useEffect, useContext } from 'react';
import { Link, useHistory } from "react-router-dom";
import { Input, Drawer, List, Divider, Col, Row, Spin } from 'antd';
import axios from 'axios';
import _ from 'lodash';

import DescriptionItem from './DescriptionItem';
import Context from '../context';
import { isValidSearchField, checkSavedCodes, deleteUnsavedProp } from '../selectors';
const { Search } = Input;

const SearchPage = () => {
  const { dispatch } = useContext(Context);
  const [carData, setCarData] = useState({});
  const [spin, setSpin] = useState(false);
  const [drawer, setDrawer] = useState(false);
  const [valid, setValid] = useState('');
  const [lastCodes, setLastCodes] = useState([]);
  const [clickedCode, setClickedCode] = useState('');
  const history = useHistory();

  useEffect(() => {
    if (!!localStorage.getItem('codes')) {
      setLastCodes(localStorage.getItem('codes').split(", "));
      setCarData(JSON.parse(localStorage.getItem("codesData") || "{}"));
    }
  }, [])
 
  const handleSearch = async value => {
    // validation of input
    setValid(isValidSearchField(value));
    if (isValidSearchField(value) !== '') return;

    // check, filter and save codes below
    setLastCodes(checkSavedCodes(value, lastCodes));
    localStorage.setItem('codes', checkSavedCodes(value, lastCodes).join(", "));
    // get and save DATA to store and to localStorage
    setSpin(true);
    const carBaseData = await axios.get(`https://vpic.nhtsa.dot.gov/api/vehicles/decodevin/${value}?format=json`);
    
    const { data: { Results } } = carBaseData;
    const onlyResultsWithValue = Results.filter(obj => (obj.Value !== null && obj.Value !== ""));
    // put to arr only obj with VARIABLE, VALUE and ID property
    const sortedResults = _.chain(onlyResultsWithValue).filter('Variable' && 'Value' && 'VariableId').map(el => _.pick(el, 'Variable', 'Value', 'VariableId')).value();
    const storageCarData = {[value]: sortedResults};
  
    setCarData({...storageCarData, ...deleteUnsavedProp(lastCodes, carData)});
    localStorage.setItem("codesData", JSON.stringify({...storageCarData, ...carData}));
    dispatch({type: "SAVE_DATA_OF_CAR", payload: sortedResults});

    setSpin(false);
    history.push("/variables");
  }

  const showDrawer = code => {
    setClickedCode(code);
    setDrawer(true);
  };

  const hideDrawer = () => setDrawer(false);

  return (
    <div className="search__box">
      <Spin style={{position: "absolute", top: "49%", left: "49%"}} tip="Loading..." spinning={spin} />
      <Search 
        className="search__box-input" 
        placeholder="Enter vin code" 
        onSearch={handleSearch}
        enterButton 
        loading={false}
      />
      <label className="input-valid">{valid}</label>
      <div className="search__box-items">
        <List
          dataSource={lastCodes}
          bordered
          renderItem={code => (
            <List.Item
              key={code}
              actions={[
                <a onClick={() => showDrawer(code)}>
                  View Base Data
                </a>,
              ]}
            >
              <List.Item.Meta
                title={
                  <Link 
                    onClick={ev => {
                      ev.persist();
                      handleSearch(ev.target.text)
                    }}
                    to="/" 
                    className="searchable-item"
                  >
                    {code}
                  </Link>
                }
              />
            </List.Item>
          )}
        />
        <Drawer
          width={640}
          placement="right"
          closable={false}
          onClose={hideDrawer}
          visible={drawer}
        >
          {(clickedCode !== '') && carData[clickedCode].map((data, idx) => (
            <Row key={data+idx}>
              <Col span={24}>
                <DescriptionItem title={data.Variable} content={data.Value} />
              </Col>
            </Row>
          ))}
          <Divider />
        </Drawer>
      </div>
    </div>
  )
}

export default SearchPage;