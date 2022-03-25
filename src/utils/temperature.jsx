const convertToFahrenheit = (tempInCelcius) => {
  return (9 / 5) * tempInCelcius + 32;
};

const tempUtils = {
  convertToFahrenheit,
};

export default tempUtils;
