const charCounting = function(input) {
  let counter;
  if(input.data) {
    counter++;
  }
  if(input.data === null) {
    counter--;
  }
  console.log(counter);
}

module.exports = { charCounting };