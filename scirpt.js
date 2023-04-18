const passLength = document.querySelector(".pass-length input");
const options = document.querySelectorAll(".option input");
const generateBtn = document.querySelector(".generate-btn");
const passwordGenerated = document.querySelector(".input-box input");
const passIndicator = document.querySelector(".pass-indicator");
const copyBtn = document.querySelector(".input-box span");

// simple object of letters which we can use in building our password
const characters={
    lowercase: "abcdefghijklmnopqrstuvwxyz",
    uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
    numbers: "0123456789",
    symbols: "~`!@#$%^&*()_-+={[}]|\:;'<,>.?/"
}

// the function to generate the password
const generatePass=()=>{
    let staticPassword = ""; // this hold the const password letters
    let randomPassword = "" // this generates the randomised password using staticpassword
    let passSize = passLength.value; // the size of password we want
    let excludeDuplicates = false;
    options.forEach(option=>{
        if(option.checked){

            if(option.id !== "exc-duplicates" && option.id !== "space"){
                // case where the duplicates are allowed while spaces are not allowed
                staticPassword+= characters[option.id];
            }
            else if(option.id === "space"){
                // case where the spacesa re allowed
                staticPassword+= ` ${staticPassword} `; // here we added space before and after each letter
            }
            else{
                // otherwise the case is duplicates are not allowed
                excludeDuplicates = true;
            }
            
            // option ID = either lowercase, uppercase, numbers or symbols
            // we have created on object of characters, where the data is stored in the form of 
            // key:value pairs
            // we provide the key i.e. out ID 
            // and we get randomised values
        }
    })

    for (let index = 0; index < passSize; index++) {
        // the staticPassword will generate the standard static array containing all the values as per option we have selected
        // then the string of staticPassword will hold all the values as per otions
        // then the randomPassword will be created based on the required size of trhe password we require 
        let randomChar =  staticPassword[Math.floor(Math.random()*staticPassword.length)];
        
        if(excludeDuplicates){
            // if the exclude duplicates option is checked then this code will run
            
            if(!randomPassword.includes(randomChar) || randomChar ==" "){
                // if the randomPassword does not already contain the randomChar variable 
                // or it is a space
                // then add the randomChar into the randomPassword
                randomPassword += randomChar;
            }else{
                // if the randomChar is already present in the randomPassword
                // then decreament the i
                index--;
            }
        }
        else{
            // else add the randomChar into the randomPassword
            randomPassword += randomChar;
        }
    }
    passwordGenerated.value = randomPassword;
}
/*
const copyPassword=()=>{
    navigator.clipboard.writeText(passwordGenerated.value);
    alert("Password Copied to your clipboard!")
}*/

const updatePassIndicator=()=>{
    if(passLength.value <= 10){
        passIndicator.id = "weak";
    }else if(passLength.value <= 20){
        passIndicator.id = "medium";
    }else{
        passIndicator.id = "strong";
    }
}

// this function handls the slider and user input for the lengrh of the password required
const updatePassLength=()=>{
    document.querySelector(".pass-length span").innerHTML= passLength.value;
    generatePass();
    updatePassIndicator();
}
updatePassLength(); // sets the inital length as 15 as per basic code


copyBtn.addEventListener("click", copyBtnSnackBar);
passLength.addEventListener("input", updatePassLength);
generateBtn.addEventListener("click", generatePass);

function copyBtnSnackBar() {
    // Get the snackbar DIV
    var x = document.getElementById("snackbar");
  
    // Add the "show" class to DIV
    x.className = "show";
  
    // After 3 seconds, remove the show class from DIV
    setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
  }
