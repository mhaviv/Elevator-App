// constructor function always starts with capital letter
// if not constructor function use camel case 
// It's the parent class for other objects 
function Passenger(name, desiredFloor){
	this.name = name;
	this.desiredFloor = desiredFloor;

}

module.exports = Passenger;