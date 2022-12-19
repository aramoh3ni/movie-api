// global Objects
console.log(); 

// setTimeout(); // call function after a delay
// clearTimeout(); // clear function after execute

// setInterval(); 
// clearInterval();

// we can use them using in window object globaly in browser
// but we don't have logic of window object in node then we 
// we can use gloal insted to window.

// we can use windows object using gloabl but
global.console.log("Hello Wolrd")

// if we create an object we can node use it and it return us undefine.
var message = "";
console.log(global.message) // return Undefined
// because it scope inside of this file (app.js) and it is not 
// globaly visitbal outside for all.

