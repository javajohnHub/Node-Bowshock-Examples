module.exports = function(io) {
  let bowshock = require("node-bowshock");
  let rp = require("request-promise");
  let moment = require("moment");
  io.sockets.on("connection", function(socket) {
    console.log("connected", socket.id);

    //apod
    socket.on("get apod", date => {
      let formatted_date = format_date(date);
      bowshock.apod(formatted_date).then(apod => {
        socket.emit("send apod", apod);
      });
    });
    //end of apod

    //mars
    socket.on("get curiosity", date => {
      let formatted_date = format_date(date);

      bowshock.mars.curiosity(formatted_date).then(rover => {
        socket.emit("send curiosity", rover);
      });
    });

    socket.on("get manifest", rover => {
      console.log(rover);
      if (!rover.sol && !rover.camera) {
        bowshock.mars.manifest(rover).then(manifest => {
          console.log(manifest);
          socket.emit("send manifest", manifest);
        });
      }
      if (rover.sol || rover.camera) {
        bowshock.mars.manifest(rover).then(photos => {
          console.log(photos);
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
    //end of mars

    //neows
    socket.on("get stats", () => {
      bowshock.neows.stats().then(stats => {
        socket.emit("send stats", stats);
      });
    });

    socket.on("get feed", date => {
      let formatted_date = format_date(date);
      bowshock.neows.feed((start_date = formatted_date)).then(feed => {
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
    //end neows

    //donki
    socket.on("get cme", object => {
      bowshock.donki.CME(object).then(cme => {
        if (cme.length == 0) {
          cme = [];
        }
        socket.emit("send cme", cme);
      });
    });

    socket.on("get cmea", object => {
      bowshock.donki.CMEA(object).then(cmea => {
        if (cmea.length == 0) {
          cmea = [];
        }
        socket.emit("send cmea", cmea);
      });
    });

    socket.on("get flr", object => {
      bowshock.donki.FLR(object).then(flr => {
        if (flr.length == 0) {
          flr = [];
        }
        socket.emit("send flr", flr);
      });
    });

    socket.on("get gst", object => {
      bowshock.donki.GST(object).then(gst => {
        if (gst.length == 0) {
          gst = [];
        }
        socket.emit("send gst", gst);
      });
    });

    socket.on("get hss", object => {
      bowshock.donki.HSS(object).then(hss => {
        if (hss.length == 0) {
          hss = [];
        }
        socket.emit("send hss", hss);
      });
    });

    socket.on("get ips", object => {
      bowshock.donki.IPS(object).then(ips => {
        if (ips.length == 0) {
          ips = [];
        }
        socket.emit("send ips", ips);
      });
    });

    socket.on("get mpc", object => {
      bowshock.donki.MPC(object).then(mpc => {
        if (mpc.length == 0) {
          mpc = [];
        }
        socket.emit("send mpc", mpc);
      });
    });

    socket.on("get notifications", object => {
      bowshock.donki.notifications(object).then(notifications => {
        if (notifications.length == 0) {
          notifications = [];
        }
        socket.emit("send notifications", notifications);
      });
    });

    socket.on("get rbe", object => {
      bowshock.donki.RBE(object).then(rbe => {
        if (rbe.length == 0) {
          rbe = [];
        }
        socket.emit("send rbe", rbe);
      });
    });

    socket.on("get sep", object => {
      bowshock.donki.SEP(object).then(sep => {
        if (sep.length == 0) {
          sep = [];
        }
        socket.emit("send sep", sep);
      });
    });

    socket.on("get wsasim", object => {
      bowshock.donki.WSASim(object).then(wsasim => {
        if (wsasim.length == 0) {
          wsasim = [];
        }
        socket.emit("send wsasim", wsasim);
      });
    });
    //end of donki

    //start of epic
    socket.on("get natural all", () => {
      bowshock.epic.naturalAll().then(naturalAll => {
        if (naturalAll.length == 0) {
          naturalAll = [];
        }
        socket.emit("send natural all", naturalAll);
      });
    });

    socket.on("get natural by date", date => {
      bowshock.epic.naturalDate(date).then(naturalByDate => {
        if (naturalByDate.length == 0) {
          naturalByDate = [];
        }
        socket.emit("send natural by date", naturalByDate);
      });
    });

    socket.on("get natural", () => {
      bowshock.epic.natural().then(natural => {
        if (natural.length == 0) {
          natural = [];
        }
        socket.emit("send natural", natural);
      });
    });

    socket.on("get natural available", () => {
      bowshock.epic.naturalAvailable().then(naturalAvailable => {
        if (naturalAvailable.length == 0) {
          naturalAvailable = [];
        }
        socket.emit("send natural available", naturalAvailable);
      });
    });

    //end of epic
  });

  function format_date(date) {
    return moment(new Date(date)).format("YYYY-MM-DD");
  }
};
