
function maxSequenceOfZeros(number){
    const binaryNumber = (number).toString(2);
    return Math.max(...binaryNumber.split('1').map((item)=>{return item.length}));
}