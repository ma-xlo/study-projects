// Bugs to solve:
// NAN when is entered a string value
// Bug when is entered more than 11 digits

const numInput = document.querySelector("#num-input");
const result = document.querySelector("#result");

const bin2Dec = (binary) => {
    
    let decimal = 0;
    let power = 0;

    while(binary != 0){
        a = binary % 10;
        b = a * 2 ** power;
        decimal += b;
        power++;
        binary = binary / 10 | 0;
    }
    return result.innerHTML = decimal;
}

const checkInput = (number) => {

    if(isNaN(number)){
        return false
    }

    while(number !== 0) {
        if(number % 10 > 1) {
            return false;
        }  
        number = number / 10 | 0;
    }
    return true;    
}

document.addEventListener("keyup", () => {

    console.log(typeof(numInput.value))

    if(checkInput(numInput.value)){
        document.querySelector("#error-msg").classList.add("hide");
        bin2Dec(numInput.value);
 
    } else {
        document.querySelector("#error-msg").classList.remove("hide");
        result.innerHTML = ""
    }
    
    if(!numInput.value) result.innerHTML = "";
    
})

