export const isValidSearchField = value => {
  // Если при написании регулярки идти от обратного, перечисляя всё,
  // что нельзя вводить, легко что-то упустить, например пробельный символ :)
  //
  // Эту проверку проходит строка, состоящая из 17 пробелов.
  // API интересно реагирует на такой запрос, пытаясь редиректнуть
  // нас на страницу https://vpic.nhtsa.dot.gov/api/error404.html,
  // на которой не настроен заголовок access-control-allow-origin,
  // в результате чего она и блочится по CORS.
  //
  // Лучше было следовать прямолинейной логике,
  // если разрешены только цифры и латинские символы, то так и записать:
  // const simpleRegExp = /^[a-zA-Z0-9]+$/;
  const allowdCharactersOnly = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/;

  return (value === '') ? 'Value must not be empty!' : 
    (allowdCharactersOnly.test(value)) ? 'Only latin and numbers are allowed!' :
    (value.length < 17) ? 'minimum number of characters 17' : '';
}

// Проверка уникальности через Set это действительно полезное свойство.
// По-моему оно делает за нас почти всю работу, остаётся только обрезать
// массив до 5 элементов, вот так:
export const checkSavedCodes = (value, lastCodes) => {
	return [...new Set([value, ...lastCodes])].slice(0, 5);
}
// Вместо нескольких избыточных проверок:
export const _checkSavedCodes = (value, lastCodes) => {
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