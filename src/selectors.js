export const isValidSearchField = value => {
  const allowdCharactersOnly = /^[a-zA-Z0-9]+$/;

  return (value === '') ? 'Value must not be empty!' : 
    (!allowdCharactersOnly.test(value)) ? 'Only latin and numbers are allowed!' :
    (value.length < 17) ? 'minimum number of characters 17' : '';
}

export const checkSavedCodes = (value, lastCodes) => {
    // save only uniq codes and no more than five
    return [...new Set([value, ...lastCodes])].slice(0, 5);
}

export const deleteUnsavedProp = (lastCodes, carData) => {
  const newCarData = {...carData};

  for (var k in newCarData) {
    if (lastCodes.indexOf(k) < 0) {
        delete newCarData[k];
    }
  }
  
  return newCarData;
}