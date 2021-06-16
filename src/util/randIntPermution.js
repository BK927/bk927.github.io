export default function randIntNoRepeat(min, max) {
  const array = Array.apply(0, Array(max - 1)).map(
    (element, index) => index + min
  );

  var i = array.length,
    j = 0,
    temp;

  while (i--) {
    j = Math.floor(Math.random() * (i + 1));

    // swap randomly chosen element with current element
    temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }

  return array;
}
