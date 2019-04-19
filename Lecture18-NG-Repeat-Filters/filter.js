var numberArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
console.log("number array: ", numberArray);
// new format
var greaterThan5 = numberArray.filter(number => number > 5);
var even = numberArray.filter(function(number) {
  return number % 2 == 0;
});
var odd = numberArray.filter(oddNumberFilter);

function oddNumberFilter(value) {
  return value % 2 > 0;
}

console.log("greater than 5 array: ", greaterThan5);
console.log("even array: ", even);
console.log("odd array: ", odd);

var shoppingList = [
  "bread",
  "butter",
  "orange juice",
  "cake",
  "Pepto Bismol flavor"
];
console.log("shoppingList: ", shoppingList);

var searchValue = "Bismol";

function containsFilter(value) {
  return value.indexOf(searchValue) !== -1;
}

console.log("Filtered shoppingList: ", shoppingList.filter(containsFilter));
