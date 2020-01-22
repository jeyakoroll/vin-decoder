export default function reducer(state, { type, payload }) {
  switch(type) {
    case "SAVE_DATA_OF_CAR":
      return {
        ...state,
        carData: payload
      }
    default: 
      return state;
  }
}