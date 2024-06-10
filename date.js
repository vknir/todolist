


const d= new Date()  //Date Object

const weekday = ["Sunday","Monday","Tuesday"
,"Wednesday","Thursday","Friday","Saturday"]; 

//Array of weekday

const month = ["January","February","March",
"April","May","June","July","August","September","October","November","December"];

//List of months 0-indexed

let year = d.getFullYear();
// current year

let currentDate = `${weekday[d.getDay()]}, ${month[d.getMonth()]} ${year}`
//store current date in string format

console.log(currentDate)

export default currentDate;