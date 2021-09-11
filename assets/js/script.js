// Get references to the #generate element
var generateBtn = document.querySelector("#generate");

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);

// Write password to the #password input
function writePassword() {
  var password = generatePassword();
  var passwordText = document.querySelector("#password");
  passwordText.value = password;
}

function generatePassword() {
  var passLength = validNum();
  var hasLowerCase = confirm("Include lowercase characters?");
  var hasUpperCase = confirm("Include uppercase characters?");
  var hasNumbers = confirm("Include numbers?");
  var hasSpecial = confirm("Include special characters: e.g. !, \", #");

  var charTypes = [hasLowerCase, hasUpperCase, hasNumbers, hasSpecial];
  var charIndexes = [];

  var password = "";

  for (var i = 0; i < charTypes.length; i++) {
    if (charTypes[i] === true) {
      charIndexes[charIndexes.length] = i;
    }
  }

  for (var i = 0; i < passLength; i++) {
    var index = randNum(0, charIndexes.length - 1);

    //randNum ranges based on HTML ASCII Character Set
    if (charIndexes.length === 0) {
      alert("Please choose at least one character type.");
      break;
    } else if (charIndexes[index] === 0) {
        password += String.fromCharCode(randNum(97, 122));
    } else if (charIndexes[index] === 1) {
        password += String.fromCharCode(randNum(65, 90));
    } else if (charIndexes[index] === 2) {
        password += String.fromCharCode(randNum(48, 57));
    } else {
        var specialChar = randNum(1, 32); 
        if (specialChar <= 15) { //32-47
          password += String.fromCharCode(specialChar + 32); 
        } else if (specialChar <= 22) { //58-64
            password += String.fromCharCode(specialChar + 42);
        } else if (specialChar <= 28) { //91-96
            password += String.fromCharCode(specialChar + 68);
        } else { //123-126
            password += String.fromCharCode(specialChar + 94);
        }
    }
  }
  return password;
}

function validNum() {
  do {
    var valid = true;
    var response = parseInt(prompt("Please enter password length."));
    if (response >= 8 && response <= 128 && response) {
      return response;
    } else {
      alert("Invalid input. Please enter a number between 8 and 128.");
      valid = false;
    }
  } while (!valid)
}

function randNum(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

