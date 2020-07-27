function stringReverse(str) {
  return Array.from(str).reverse().join(""); // str.split
}

function longestWord(str) {
  const words = str.split(" ").map((word) => word.length);
  return Math.max(...words);
}

function endWordIs(word, end){
    const expression=`${end}\$`;
    const pattern = new RegExp(expression);
    return pattern.test(word);
}

function maxFromSubArrays(arr){
    return arr.map((mas)=>Math.max(...mas));
}
