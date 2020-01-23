export const isValidSearchField = value => {
  const allowdCharactersOnly = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/;

  return (value === '') ? 'Value must not be empty!' : 
    (allowdCharactersOnly.test(value)) ? 'Only latin and numbers are allowed!' :
    (value.length < 17) ? 'minimum number of characters 17' : '';
}

export const checkSavedCodes = (value, lastCodes) => {
  if (lastCodes.length < 5) {
    // save only uniq codes 
    return [...new Set([value, ...lastCodes])];
  } else {
    const codeSavedBelove = lastCodes.some(el => el === value);
    if (codeSavedBelove) {
      return [...new Set([value, ...lastCodes])];
    } else {
      const noMoreThanFiveCodes = lastCodes.filter((code, idx) => idx !== 4);
      return [...new Set([value, ...noMoreThanFiveCodes])];
    }
  }
}

export const deleteUnsavedProp = (lastCodes, carData) => {
  for (var k in carData) {
    if (lastCodes.indexOf(k) < 0) {
        delete carData[k];
    }
  }
  return carData;
}