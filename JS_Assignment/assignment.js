// 1. Write a JavaScript function that reverse a number.
function reverseNumber(x) {
  return parseInt(String(x).split('').reverse().join(''));
}

console.log("Question 1");
console.log(reverseNumber(32243)); // Output: 34223
console.log(reverseNumber(12345)); // Output: 54321


// 2. Write a JavaScript function that checks whether a passed string is palindrome or not?
function isPalindrome(str) {
  const original = str.toLowerCase().replace(/\s/g, '');
  const reversed = original.split('').reverse().join('');
  return original === reversed;
}

console.log("\nQuestion 2");
console.log(isPalindrome("madam")); // Output: true
console.log(isPalindrome("nurses run")); // Output: true
console.log(isPalindrome("hello")); // Output: false


// 3. Write a JavaScript function that generates all combinations of a string.
function generateCombinations(str) {
  const combinations = [];
  
  for(let i = 0; i < str.length; i++) {
    for(let j = i + 1; j <= str.length; j++) {
      combinations.push(str.substring(i, j));
    }
  }

  return combinations;
}

console.log("\nQuestion 3");
console.log(generateCombinations('dog')); // Output: ['d', 'do', 'dog', 'o', 'og', 'g']


// 4. Write a JavaScript function that returns a passed string with letters in alphabetical order.
function sortString(str) {
  return str.split('').sort().join('');
}

console.log("\nQuestion 4");
console.log(sortString('webmaster')); // Output: 'abeemrstw'


// 5. Write a JavaScript function that accepts a string as a parameter and converts the first
// letter of each word of the string in upper case.
function capitalizeWords(str) {
  return str.split(' ').map(word => {
    return word.charAt(0).toUpperCase() + word.slice(1);
  }).join(' ');
}

console.log("\nQuestion 5");
console.log(capitalizeWords('the quick brown fox')); // Output: 'The Quick Brown Fox'


// 6. Write a JavaScript function that accepts a string as a parameter and find the longest word
// within the string.
function findLongestWord(str) {
  const words = str.split(' ');
  return words.reduce((longest, current) => {
    return (current.length > longest.length) ? current : longest;
  });
}

console.log("\nQuestion 6");
console.log(findLongestWord('Web Development Tutorial')); // Output: 'Development'


// 7. Write a JavaScript function that accepts a string as a parameter and counts the number of
// vowels within the string.
function countVowels(str) {
  const vowels = 'aeiouAEIOU';
  let count = 0;
  
  for(let char of str) {
    if(vowels.includes(char)) {
      count++;
    }
  }
  
  return count;
}

console.log("\nQuestion 7");
console.log(countVowels('The quick brown fox')); // Output: 5


// 8. Write a JavaScript function that accepts a number as a parameter and check the number is
// prime or not.
function isPrime(num) {
  if(num <= 1) return false;
  if(num <= 3) return true;
  
  for(let i = 2; i <= Math.sqrt(num); i++) {
    if(num % i === 0) {
      return false;
    }
  }
  
  return true;
}

console.log("\nQuestion 8");
console.log(isPrime(17)); // Output: true
console.log(isPrime(10)); // Output: false


// 9. Write a JavaScript function which accepts an argument and returns the type.
function getType(arg) {
  return typeof arg;
}

console.log("\nQuestion 9");
console.log(getType(123)); // Output: 'number'
console.log(getType('hello')); // Output: 'string'
console.log(getType(true)); // Output: 'boolean'
console.log(getType(() => {})); // Output: 'function'
console.log(getType({})); // Output: 'object'
console.log(getType(undefined)); // Output: 'undefined'


// 10. Write a JavaScript function which returns the n rows by n columns identity matrix.
function identityMatrix(n) {
  const matrix = [];
  
  for(let i = 0; i < n; i++) {
    matrix[i] = [];
    for(let j = 0; j < n; j++) {
      matrix[i][j] = (i === j) ? 1 : 0;
    }
  }
  
  return matrix;
}

console.log("\nQuestion 10");
console.log(identityMatrix(3)); // Output: [[1, 0, 0], [0, 1, 0], [0, 0, 1]]


// 11. Write a JavaScript function which will take an array of numbers stored and find the
// second lowest and second greatest numbers, respectively.
function secondMinMax(arr) {
  const sorted = [...arr].sort((a, b) => a - b);
  
  if(sorted.length < 2) {
    return "Array must have at least 2 unique elements";
  }
  
  const secondLowest = sorted[1];
  const secondGreatest = sorted[sorted.length - 2];
  
  return [secondLowest, secondGreatest];
}

console.log("\nQuestion 11");
console.log(secondMinMax([1, 2, 3, 4, 5])); // Output: [2, 4]


// 12. Write a JavaScript function which says whether a number is perfect.
function isPerfect(num) {
  if(num <= 0) return false;
  
  let sum = 0;
  for(let i = 1; i < num; i++) {
    if(num % i === 0) {
      sum += i;
    }
  }
  
  return sum === num;
}

console.log("\nQuestion 12");
console.log(isPerfect(6)); // Output: true
console.log(isPerfect(28)); // Output: true
console.log(isPerfect(10)); // Output: false


// 13. Write a JavaScript function to compute the factors of a positive integer.
function getFactors(num) {
  const factors = [];
  
  for(let i = 1; i <= num; i++) {
    if(num % i === 0) {
      factors.push(i);
    }
  }
  
  return factors;
}

console.log("\nQuestion 13");
console.log(getFactors(12)); // Output: [1, 2, 3, 4, 6, 12]


// 14. Write a JavaScript function to convert an amount to coins.
function amountToCoins(amount, coins) {
  const result = [];
  
  for(let coin of coins) {
    while(amount >= coin) {
      result.push(coin);
      amount -= coin;
    }
  }
  
  return result;
}

console.log("\nQuestion 14");
console.log(amountToCoins(46, [25, 10, 5, 2, 1])); // Output: [25, 10, 10, 1]


// 15. Write a JavaScript function to compute the value of bn where n is the exponent and b is
// the bases. Accept b and n from the user and display the result.
function computePower(base, exponent) {
  return Math.pow(base, exponent);
}

console.log("\nQuestion 15");
console.log(computePower(2, 3)); // Output: 8
console.log(computePower(5, 2)); // Output: 25


// 16. Write a JavaScript function to extract unique characters from a string.
function uniqueCharacters(str) {
  const seen = {};
  let result = '';
  
  for(let char of str) {
    if(!seen[char]) {
      seen[char] = true;
      result += char;
    }
  }
  
  return result;
}

console.log("\nQuestion 16");
console.log(uniqueCharacters("thequickbrownfoxjumpsoverthelazydog"));
// Output: "thequickbrownfxjmpsvlazydg"


// 17. Write a JavaScript function to get the number of occurrences of each letter in specified
// string.
function letterOccurrences(str) {
  const charCount = {};
  
  for(let char of str) {
    if(char !== ' ') {
      charCount[char] = (charCount[char] || 0) + 1;
    }
  }
  
  return charCount;
}

console.log("\nQuestion 17");
console.log(letterOccurrences("hello world"));
// Output: { h: 1, e: 1, l: 3, o: 2, w: 1, r: 1, d: 1 }


// 18. Write a function for searching JavaScript arrays with a binary search.
function binarySearch(arr, target) {
  let left = 0;
  let right = arr.length - 1;
  
  while(left <= right) {
    const mid = Math.floor((left + right) / 2);
    
    if(arr[mid] === target) {
      return mid;
    } else if(arr[mid] < target) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }
  
  return -1; // Not found
}

console.log("\nQuestion 18");
console.log(binarySearch([1, 3, 5, 7, 9, 11], 7)); // Output: 3
console.log(binarySearch([1, 3, 5, 7, 9, 11], 6)); // Output: -1


// 19. Write a JavaScript function that returns array elements larger than a number.
function elementsLargerThan(arr, num) {
  return arr.filter(element => element > num);
}

console.log("\nQuestion 19");
console.log(elementsLargerThan([1, 5, 3, 9, 2, 8], 5)); // Output: [9, 8]


// 20. Write a JavaScript function that generates a string id (specified length) of random
// characters.
function generateId(length) {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let id = '';
  
  for(let i = 0; i < length; i++) {
    id += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  
  return id;
}

console.log("\nQuestion 20");
console.log(generateId(10)); // Output: Random string of 10 characters


// 21. Write a JavaScript function to get all possible subset with a fixed length (for example 2)
// combinations in an array.
function getCombinations(arr, length) {
  const result = [];
  
  function combine(start, current) {
    if(current.length === length) {
      result.push([...current]);
      return;
    }
    
    for(let i = start; i < arr.length; i++) {
      current.push(arr[i]);
      combine(i + 1, current);
      current.pop();
    }
  }
  
  combine(0, []);
  return result;
}

console.log("\nQuestion 21");
console.log(getCombinations([1, 2, 3], 2)); // Output: [[1, 2], [1, 3], [2, 3]]


// 22. Write a JavaScript function that accepts two arguments, a string and a letter and the
// function will count the number of occurrences of the specified letter within the string.
function countLetter(str, letter) {
  return str.split('').filter(char => char === letter).length;
}

console.log("\nQuestion 22");
console.log(countLetter('microsoft.com', 'o')); // Output: 3


// 23. Write a JavaScript function to find the first not repeated character.
function firstNotRepeated(str) {
  const charCount = {};
  
  for(let char of str) {
    charCount[char] = (charCount[char] || 0) + 1;
  }
  
  for(let char of str) {
    if(charCount[char] === 1) {
      return char;
    }
  }
  
  return null;
}

console.log("\nQuestion 23");
console.log(firstNotRepeated('abacddbec')); // Output: 'e'


// 24. Write a JavaScript function to apply Bubble Sort algorithm.
function bubbleSort(arr) {
  const result = [...arr];
  const n = result.length;
  
  for(let i = 0; i < n; i++) {
    for(let j = 0; j < n - i - 1; j++) {
      if(result[j] < result[j + 1]) {
        [result[j], result[j + 1]] = [result[j + 1], result[j]];
      }
    }
  }
  
  return result;
}

console.log("\nQuestion 24");
const testArray = [12, 345, 4, 546, 122, 84, 98, 64, 9, 1, 3223, 455, 23, 234, 213];
console.log(bubbleSort(testArray));
// Output: [3223, 546, 455, 345, 234, 213, 122, 98, 84, 64, 23, 12, 9, 4, 1]


// 25. Write a JavaScript function that accept a list of country names as input and returns the
// longest country name as output.
function longestCountryName(countries) {
  return countries.reduce((longest, current) => {
    return (current.length > longest.length) ? current : longest;
  });
}

console.log("\nQuestion 25");
console.log(longestCountryName(["Australia", "Germany", "United States of America"]));
// Output: "United States of America"


// 26. Write a JavaScript function to find longest substring in a given a string without repeating
// characters.
function longestSubstring(str) {
  let longest = '';
  let current = '';
  const charIndex = {};
  
  for(let i = 0; i < str.length; i++) {
    const char = str[i];
    
    if(charIndex[char] !== undefined && charIndex[char] >= i - current.length) {
      current = current.substring(charIndex[char] - (i - current.length) + 1);
    }
    
    current += char;
    charIndex[char] = i;
    
    if(current.length > longest.length) {
      longest = current;
    }
  }
  
  return longest;
}

console.log("\nQuestion 26");
console.log(longestSubstring("abcabcbb")); // Output: "abc"
console.log(longestSubstring("bbbbb")); // Output: "b"
console.log(longestSubstring("pwwkew")); // Output: "wke"


// 27. Write a JavaScript function that returns the longest palindrome in a given string.
function longestPalindrome(str) {
  if(str.length < 1) return '';
  
  let longest = str[0];
  
  for(let i = 0; i < str.length; i++) {
    // Palindromes of odd length
    let left = i, right = i;
    while(left >= 0 && right < str.length && str[left] === str[right]) {
      const palindrome = str.substring(left, right + 1);
      if(palindrome.length > longest.length) {
        longest = palindrome;
      }
      left--;
      right++;
    }
    
    // Palindromes of even length
    left = i;
    right = i + 1;
    while(left >= 0 && right < str.length && str[left] === str[right]) {
      const palindrome = str.substring(left, right + 1);
      if(palindrome.length > longest.length) {
        longest = palindrome;
      }
      left--;
      right++;
    }
  }
  
  return longest;
}

console.log("\nQuestion 27");
console.log(longestPalindrome("bananas")); // Output: "anana"
console.log(longestPalindrome("abracadabra")); // Output: "aca"


// 28. Write a JavaScript program to pass a 'JavaScript function' as parameter.
function applyFunction(func, value) {
  return func(value);
}

console.log("\nQuestion 28");
console.log(applyFunction(countVowels, 'I love JavaScript')); // Output: 6
console.log(applyFunction(isPerfect, 496)); // Output: true


// 29. Write a JavaScript function to get the function name.
function getFunctionName(func) {
  return func.name || 'anonymous';
}

console.log("\nQuestion 29");
console.log(getFunctionName(function namedFunction() {})); // Output: 'namedFunction'
console.log(getFunctionName(() => {})); // Output: 'anonymous'
console.log(getFunctionName(isPrime)); // Output: 'isPrime'