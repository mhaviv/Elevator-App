//** PLANNING */

// We need to import elevator and passenger classes

// 3 passengers with names and desired floors

// Elevator Class
  // Should extend EventEmitter Class - listens for certain action (like click)
  // params: current passenger, current floor
  // methods: load passenger, unload passenger 
    // 1 second delay between floors
  // respond to up and down   


// Passenger Class
// params: name, desired floor 
// methods: go up, go down 

//** CODING */ 
let Passenger = require('./passenger.js');
let EventEmitter = require('events');

let john = new Passenger('John', 3);
let sally = new Passenger('Sally', 4);
let david = new Passenger('David', 8);

let passengers = [
	john, 
	sally,
	david,
];

function Elevator (currentPassenger, currentFloor){
	// set a default with OR
	this.currentPassenger = currentPassenger || {}; //if no current passenger set empty object
	this.currentFloor = currentFloor || 0;
}


Elevator.prototype = new EventEmitter();

Elevator.prototype.loadPassenger = function(passenger){
	console.log(`Loading passenger ${passenger.name} at floor ${this.currentFloor}`)
	this.currentPassenger = passenger
	this.emit('up');
	
}

Elevator.prototype.unloadPassenger = function(){
	this.currentPassenger = {}
	this.emit('down');
	
}

Elevator.prototype.goUp = function(){
	console.log(`Elevator taking ${this.currentPassenger.name} up. Currently at floor ${this.currentFloor}`)
	this.currentFloor++;
	
}

Elevator.prototype.goDown = function(){
	console.log(`Elevator going down. Currently at floor ${this.currentFloor}`)
	this.currentFloor--;

}

var elevator = new Elevator();

// console.log(elevator)
elevator.on('up', function(){

	setTimeout(function(){
		// keep going up until we have reached the desired floor 
		
		// everytime we go up a floor check if it is the desired floor 
		if(this.currentFloor === this.currentPassenger.desiredFloor){
			// unload passenger
			this.unloadPassenger();
		// if not desired floor
		} else { 
			// keep going up
			this.goUp();
			this.emit('up');
		}
	}.bind(this), 1000);

});
elevator.on('down', function(){

	setTimeout(function(){
		// keep going down until we have reached the lobby
		if(this.currentFloor !== 0){
			this.goDown();
			this.emit('down');
		} else {
			// we are in the lobby 
			let nextPassenger = passengers.pop();

			if(nextPassenger){
				this.loadPassenger(nextPassenger);
			} else {
				console.log(`No more passengers. We are back at floor ${this.currentFloor}`)
				
			}
		}

	}.bind(this), 1000);

});

elevator.loadPassenger(passengers.pop());





