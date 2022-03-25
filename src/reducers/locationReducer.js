const locationReducer = (
  state = {
    locName: 'London',
    woeId: '',
    date: '2022/3/21',
    latlong: { lat: '', long: '' },
    unit: 'C'
  },
  action
) => {
  switch (action.type) {
    case 'SET_LOC':
      return {
        ...state,
        locName: action.locName,
      };
    case 'SET_WOEID':
      return {
        ...state,
        woeId: action.woeId,
      };
    case 'SET_DATE':
      return {
        ...state,
        date: action.date,
      };
    case 'SET_LATLONG':
      return {
        ...state,
        latlong: {
          lat: action.lat,
          long: action.long,
        },
      };
    case 'SET_UNITS':
      return {
        ...state,
        unit: action.unit,
      };
    default:
      return state;
  }
};

export default locationReducer;
