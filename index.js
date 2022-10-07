// Setup basic express server
const express = require('express');
const app = express();
const path = require('path');
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const port = process.env.PORT || 3000;

server.listen(port, () => {
  console.log('Server listening at port %d', port);
});

// Routing
app.use(express.static(path.join(__dirname, 'public')));

// Chatroom

let numUsers = 0;
const drivers = [];

const passengers = [];

io.on('connection', (socket) => {
    const driversSpace = socket.of('/driver')
    const passengersSpace = socket.of('/passengers')
    driversSpace.on('put-driver-online', ({driverName, location}) => {
        if (driverName && location) {
            drivers.push({id: drivers.length + 1, driverName, location });

            passengersSpace.emit('drivers-online', {drivers})
        }
    })
    
    passengerSpace.on('request-ride', ({ userName, destination, currentLocation }) => {
        if (userName, destination, currentLocation) {
            passengers.push({ id: passengers.length + 1, userName, destination, currentLocation, hasFoundDriver: false, hasStartedRiding: false })
            
            // broadcast to all drivers
            driversSpace.emit('driver-needed',
            // share the requesting passengers details
            {
                userName, destination, currentLocation,
            })
        }
    })
});
