function stringReverse(str) {
  return Array.from(str).reverse().join(""); // str.split
}

function longestWord(str) {
  const words = str.split(" ").reduce((accum,word) => {acctum = Math.max(accum,word.length)});
  return Math.max(...words);//reduce
}

function endWordIs(word, end){
    const expression=`${end}\$`;//no regexp
    const pattern = new RegExp(expression);
    return pattern.test(word);
}

function maxFromSubArrays(arr){
    return arr.map((mas)=>Math.max(...mas));
}

    //binaryNumber.split('').reduce((acum,cur)=>acum+Number.parseInt(cur),0)
    //const zerosString = binaryNumber.split('').reduce((acum,cur)=>acum = acum+Number.parseInt(cur),0);
