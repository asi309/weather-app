import { locationActions } from "../actions";

const locationSuccess = (dispatch, pos) => {
  const { latitude, longitude } = pos.coords;
  dispatch(locationActions.setLatLong(latitude, longitude));
};

const locationFailure = () => {
  console.log('Location access blocked. Falling back to default location');
};

const locate = (dispatch) =>
  navigator.geolocation.getCurrentPosition(locationSuccess.bind(this, dispatch), locationFailure);

const locationUtils = {
  locationSuccess,
  locationFailure,
  locate,
};

export default locationUtils;
