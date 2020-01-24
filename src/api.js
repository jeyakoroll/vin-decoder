import axios from 'axios';

const baseUrl = 'https://vpic.nhtsa.dot.gov';

const reuqestAllResults = async (to) => {
  const carBaseData = await axios.get(`${baseUrl}${to}`);
  const { data: { Results } } = carBaseData;
  return Results.filter(obj => (obj.Value !== null && obj.Value !== ""));
};

const requestSelectedVariable = async (to, variable) => {
  const {data: {Results}} = await axios.get(`${baseUrl}${to}`);
  return Results.filter(el => el.ID === parseInt(variable))[0];
};

export {
  reuqestAllResults,
  requestSelectedVariable
};