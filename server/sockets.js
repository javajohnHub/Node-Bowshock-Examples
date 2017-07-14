module.exports = function(io) {
let bowshock = require('node-bowshock');
let fs = require('fs');

    io.sockets.on('connection', function(socket) {
       console.log('connected', socket.id)

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
            socket.on('get curiosity', (date) => {
                let formatted_date = format_date(date);
                bowshock.mars.curiosity(formatted_date)
                    .then((result) => {
                            socket.emit('send curiosity', result)
                        }
                    ).catch((e) => {
                    console.log(e)
                })
            })

                socket.on('get opportunity', (date) => {
                    let formatted_date = format_date(date);
                    bowshock.mars.opportunity(formatted_date)
                        .then((result) => {
                                socket.emit('send opportunity', result)
                            }
                        ).catch((e) => {
                        console.log(e)
                    })
                })

                    socket.on('get spirit', (date) => {
                        let formatted_date = format_date(date);
                        bowshock.mars.spirit(formatted_date)
                            .then((result) => {
                                    socket.emit('send spirit', result)
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
