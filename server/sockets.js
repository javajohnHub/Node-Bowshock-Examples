module.exports = function(io) {
  let bowshock = require("node-bowshock");
  let rp = require("request-promise");
  let moment = require('moment')
  io.sockets.on("connection", function(socket) {
    console.log("connected", socket.id);

    socket.on("get apod", date => {
      let formatted_date = format_date(date);
      bowshock.apod(formatted_date).then(apod => {
        socket.emit("send apod", apod);
      });
    });
    socket.on("get curiosity", date => {
      
      let formatted_date = format_date(date);
      
      bowshock.mars.curiosity(formatted_date).then(rover => {
        socket.emit("send curiosity", rover);
      });
    });

    socket.on("get manifest", rover => {
      console.log(rover)
      if(!rover.sol && !rover.camera){
        bowshock.mars.manifest(rover).then(manifest => {
          console.log(manifest)
          socket.emit("send manifest", manifest);
        });
      }
      if(rover.sol || rover.camera){
        bowshock.mars.manifest(rover).then(photos => {
          console.log(photos)
          socket.emit("send rover by param", photos);
        });
      }

      
    });


    socket.on("get opportunity", date => {
      let formatted_date = format_date(date);
      bowshock.mars.opportunity(formatted_date).then(rover => {
        socket.emit("send opportunity", rover);
      });
    });

    socket.on("get spirit", date => {
      let formatted_date = format_date(date);
      bowshock.mars.spirit(formatted_date).then(rover => {
        socket.emit("send spirit", rover);
      });
    });
    socket.on("get stats", () => {
      bowshock.neows.stats().then(stats => {
        socket.emit("send stats", stats);
      });;
      
    });

    socket.on("get feed", date => {
      let formatted_date = format_date(date);
      bowshock.neows.feed(start_date=formatted_date).then(feed => {
        socket.emit("send feed", feed);
      });
    });
    socket.on("get next", url => {
      var options = {
        uri: url,
        json: true
      };
      rp(options)
        .then(function(result) {
          socket.emit("send next", result);
        })
        .catch(function(err) {
          console.log(err);
        });
    });

    socket.on("get previous", url => {
      var options = {
        uri: url,
        json: true
      };
      rp(options)
        .then(function(result) {
          socket.emit("send previous", result);
        })
        .catch(function(err) {
          console.log(err);
        });
    });

    socket.on("get eva", () => {
      bowshock.eva().then(eva => {
        socket.emit("recieve eva", eva);
      });
    });

    socket.on("get today", () => {
      bowshock.neows.today().then(today => {
        socket.emit("send today", today);
      });
    });
  });

  function format_date(date) {
    return moment(new Date(date)).format('YYYY-MM-DD') 
}
};
