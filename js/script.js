//call back functions -  A function which can be passed as an argument to another function

// function greet(name, callbackName){
//     console.log(name);
//     callbackName("Hello");
// }

// function showMessage(message){
//     console.log('This function will be invoked from another function ',message);
// }

// greet("John", showMessage);

function sum(callBackFunc, ...data){
    let result=0;
    // console.log(typeof(a[0]));
    for(let i of data){
        result+=i;
    }
    callBackFunc(`The result is ${result}`);
}

function displayResult(value){
    console.log(value);
}

sum(displayResult, 1,2,3,4,5);

