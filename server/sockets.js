module.exports = function(io) {
let bowshock = require('node-bowshock');
let rp = require('request-promise');
    io.sockets.on('connection', function(socket) {
       console.log('connected', socket.id)

        socket.on('get apod', (date) => {
            console.log(date);
            let formatted_date = format_date(date);
            socket.emit('send apod', bowshock.apod(formatted_date))
        })
            socket.on('get curiosity', (date) => {
                let formatted_date = format_date(date);
                socket.emit('send curiosity',  bowshock.mars.curiosity(formatted_date))
            })

                socket.on('get opportunity', (date) => {
                    let formatted_date = format_date(date);
                    socket.emit('send opportunity',bowshock.mars.opportunity(formatted_date))
                })

                    socket.on('get spirit', (date) => {
                        let formatted_date = format_date(date);
                        socket.emit('send spirit', bowshock.mars.spirit(formatted_date))
                    })
        socket.on('get stats', () => {
            socket.emit('send stats',bowshock.neows.stats())
        })

        socket.on('get feed', (date) => {
            let formatted_date = format_date(date);
            socket.emit('send feed', bowshock.neows.feed(formatted_date))
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
                    socket.emit('send previous', result)
                })
                .catch(function (err) {
                    console.log(err);
                });
        })

        socket.on('get eva', () => {
            socket.emit('recieve eva', bowshock.eva())
        })

        socket.on('get today', () => {
            socket.emit('send today', bowshock.neows.today())
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
