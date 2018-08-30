module.exports = function(io) {
  let bowshock = require("node-bowshock");
  let rp = require("request-promise");
  io.sockets.on("connection", function(socket) {
    console.log("connected", socket.id);

    socket.on("get apod", date => {
      console.log(date)
      bowshock.apod(date).then(apod => {
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
      
      if(!rover.sol && !rover.camera){
        bowshock.mars.manifest(rover).then(manifest => {
          socket.emit("send manifest", manifest);
        });
      }
      if(rover.sol && !rover.camera){
        bowshock.mars.manifest(rover).then(manifest => {
          socket.emit("send rover by sol", manifest);
        });
      }
      if(rover.camera && !rover.sol){
        bowshock.mars.manifest(rover).then(manifest => {
          socket.emit("send rover by camera", manifest);
        });
      }
      if(rover.camera && rover.sol){
        bowshock.mars.manifest(rover).then(manifest => {
          socket.emit("send rover by sol and camera", manifest);
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
      bowshock.neows.feed(formatted_date).then(feed => {
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
    if(typeof date == Date){
      var year = date.getFullYear();
      var month = date.getMonth();
      var day = date.getDay();
      if (month < 10) month = "0" + month;
      if (day < 10) day = "0" + day;
      return `${year}-${month}-${day}`;
    }else{
      return date;
    }

  }
};
