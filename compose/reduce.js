const array1 = [[0, 1], [2, 3], [4, 5]].reduceRight(
    (previousValue, currentValue) => previousValue.concat(currentValue)
);

console.log(array1);
// expected output: Array [4, 5, 2, 3, 0, 1]
var flattened = [[0, 1], [2, 3], [4, 5]].reduceRight(function(a, b) {
    return a.concat(b);
}, []);
// flattened is [4, 5, 2, 3, 0, 1]
var total = [0, 1, 2, 3].reduceRight(function(a, b) {
    return a + b;
});
// total == 6