const setLocation = (location = '') => ({
  type: 'SET_LOC',
  locName: location,
});

const setWoeId = (woeId = '') => ({
  type: 'SET_WOEID',
  woeId,
});

const setDate = (date = '') => ({
  type: 'SET_DATE',
  date,
});

const setLatLong = (lat = '', long = '') => ({
  type: 'SET_LATLONG',
  lat,
  long,
});

const setUnits = (unit = 'C') => ({
  type: 'SET_UNITS',
  unit,
});

const actions = {
  setLocation,
  setWoeId,
  setDate,
  setLatLong,
  setUnits,
};

export default actions;
