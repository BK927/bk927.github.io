function generateRandomRGB() {
  const getRandomInt = function (max) {
    return Math.floor(Math.random() * Math.floor(max));
  };

  const red = getRandomInt(256);
  const green = getRandomInt(256);
  const blue = getRandomInt(256);

  return "rgba(" + red.toString() + ", " + green.toString() + ", " + blue.toString() + ", ";
}

function generateChartColor(array) {
  const colors = { backgroundColor: [], borderColor: [] };

  array.data.forEach((element) => {
    const rgb = generateRandomRGB();
    colors.backgroundColor.push(rgb + "0.6)");
    colors.borderColor.push(rgb + "1)");
  });

  return colors;
}

export default generateChartColor;
