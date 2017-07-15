module.exports = function(io) {
let bowshock = require('node-bowshock');
let rp = require('request-promise');
    io.sockets.on('connection', function(socket) {
       console.log('connected', socket.id)

        socket.on('get apod', (date) => {
            console.log(date);
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
        socket.on('get stats', () => {
            bowshock.neows.stats()
                .then((result) => {
                        socket.emit('send stats', result)
                    }
                ).catch((e) => {
                console.log(e)
            })
        })

        socket.on('get feed', (date) => {
            let formatted_date = format_date(date);
            bowshock.neows.feed(formatted_date)
                .then((result) => {
                        socket.emit('send feed', result)
                    }
                ).catch((e) => {
                console.log(e)
            })
        })
        socket.on('get next', (url) => {
            var options = {
                uri: url,
                json: true
            };
            rp(options)
                .then(function (result) {
                    socket.emit('send next', result)
                })
                .catch(function (err) {
                    console.log(err);
                });
        })

        socket.on('get previous', (url) => {
            var options = {
                uri: url,
                json: true
            };
            rp(options)
                .then(function (result) {
                    socket.emit('send next', result)
                })
                .catch(function (err) {
                    console.log(err);
                });
        })

        socket.on('get eva', () => {
            bowshock.eva()
                .then((result) => {
                        socket.emit('recieve eva', result)
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
