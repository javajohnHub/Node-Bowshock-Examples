module.exports = function(io) {
let bowshock = require('node-bowshock');
let fs = require('fs');

    io.sockets.on('connection', function(socket) {
       console.log('connected', socket.id)

        socket.on('drip', () => {
            socket.emit('drop');
            console.log('apod recieved')
        })

        socket.on('get apod', (date) => {
            let formatted_date = format_date(date);
            bowshock.apod(formatted_date)
                .then((result) => {
                    socket.emit('send apod', result)
                    }
                ).catch((e) => {
                console.log(e)
            })


        })

    });

    function format_date(date) {
        var year = date.year;
        var month = date.month;
        var day = date.day;
        if(month < 10) month = '0' + month;
        if(day < 10) day = '0' + day;

        return `${year}-${month}-${day}`;

    }
};
