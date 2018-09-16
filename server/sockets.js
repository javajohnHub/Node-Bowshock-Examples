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

    socket.on("get natural by date", date => {
      bowshock.epic
        .naturalDate(date)
        .then(naturalByDate => {
          if (naturalByDate.length == 0) {
            naturalByDate = [];
          }
          socket.emit("send natural by date", naturalByDate);
        })
        .catch(err => {
          socket.emit("send error", err);
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
    socket.on("get enhanced by date", date => {
      bowshock.epic
        .enhancedDate(date)
        .then(enhancedByDate => {
          if (enhancedByDate.length == 0) {
            enhancedByDate = [];
          }
          socket.emit("send enhanced by date", enhancedByDate);
        })
        .catch(err => {
          socket.emit("send error", err);
        });
    });

    socket.on("get natural image", obj => {
      bowshock.epic
        .createNaturalImageLink(obj)
        .then(naturalImage => {
          socket.emit("send natural image", naturalImage);
        })
        .catch(err => {
          socket.emit("send error", err);
        });
    });

    socket.on("get enhanced available", () => {
      bowshock.epic.naturalAvailable().then(enhancedAvailable => {
        if (enhancedAvailable.length == 0) {
          enhancedAvailable = [];
        }
        socket.emit("send enhanced available", enhancedAvailable);
      });
    });
    socket.on("get enhanced image", obj => {
      console.log(obj);
      bowshock.epic
        .createEnhancedImageLink(obj)
        .then(enhancedImage => {
          socket.emit("send enhanced image", enhancedImage);
        })
        .catch(err => {
          socket.emit("send error", err);
        });
    });
    //end of epic
    //start of eonet
    socket.on("get layers", id => {
      bowshock.eonet.layers(id).then(layers => {
        socket.emit("send layers", layers);
      });
    });

    socket.on("get categories", obj => {
      console.log(obj);
      if (obj != null) {
        bowshock.eonet.categories(obj).then(categories => {
          socket.emit("send categories", categories);
        });
      } else {
        bowshock.eonet.categories().then(categories => {
          socket.emit("send categories", categories);
        });
      }
    });

    socket.on("get events", obj => {
      console.log(obj);
      if (obj != null) {
        bowshock.eonet.events(obj).then(events => {
          socket.emit("send events", events);
        });
      } else {
        bowshock.eonet.events().then(events => {
          socket.emit("send events", events);
        });
      }
    });

    socket.on("get sources", () => {
      bowshock.eonet.sources().then(sources => {
        socket.emit("send sources", sources);
      });
    });

    socket.on("get earth imagery", obj => {
      console.log(obj);
      bowshock.earth
        .imagery(obj)
        .then(images => {
          console.log("images", images);
          if (images != null || images != undefined) {
            socket.emit("send earth imagery", images);
          }
        })
        .catch(err => console.log(err));
    });
    //end of eonet

    //start of geneLab
    socket.on("get geneLab", obj => {
      console.log(obj);
      bowshock.geneLab.search(obj).then(gene => {
        console.log(gene);
        socket.emit("send geneLab", gene);
      });
    });
    socket.on("get html", obj => {
      console.log(obj);
      bowshock.geneLab.htmlSearch(obj).then(html => {
        console.log(html);
        socket.emit("send html", html);
      });
    });
    //end of geneLab

    //start of patents
    socket.on("get patent", obj => {
      console.log(obj);
      bowshock
        .patents(obj)
        .then(patent => {
          console.log("patent", patent);
          socket.emit("send patent", patent);
        })
        .catch(err => {
          socket.emit("send error", err);
        });
    });

    //end of patents

    //start of ExoPlanet
    socket.on(
      "get allPlanetaryCandidatesSmallerThan2ReWithEquilibriumTemperaturesBetween180and303K",
      () => {
        bowshock.exoPlanet
          .allPlanetaryCandidatesSmallerThan2ReWithEquilibriumTemperaturesBetween180and303K()
          .then(data => {
            console.log(data);
            socket.emit(
              "send allPlanetaryCandidatesSmallerThan2ReWithEquilibriumTemperaturesBetween180and303K",
              data
            );
          });
      }
    );

    socket.on("get allConfirmedPlanetsAndCols", () => {
      bowshock.exoPlanet.allConfirmedPlanetsAndCols().then(data => {
        console.log(data);
        socket.emit("send allConfirmedPlanetsAndCols", data);
      });
    });

    socket.on("get getSingleKOI", koi => {
      bowshock.exoPlanet.getSingleKOI(koi).then(data => {
        console.log(data);
        socket.emit("send getSingleKOI", data);
      });
    });

    socket.on("get confirmedPlanetsInKeplerField", () => {
      bowshock.exoPlanet.confirmedPlanetsInKeplerField().then(data => {
        console.log(data);
        socket.emit("send confirmedPlanetsInKeplerField", data);
      });
    });
    socket.on("get starsKnownToHostExoPlanets", () => {
      bowshock.exoPlanet.starsKnownToHostExoPlanets().then(data => {
        console.log(data);
        socket.emit("send starsKnownToHostExoPlanets", data);
      });
    });
    socket.on("get confirmedPlanetsThatTransitHostStars", () => {
      bowshock.exoPlanet.confirmedPlanetsThatTransitHostStars().then(data => {
        console.log(data);
        socket.emit("send confirmedPlanetsThatTransitHostStars", data);
      });
    });
    socket.on("get currentNonConfirmedPlanetCandidates", () => {
      bowshock.exoPlanet.currentNonConfirmedPlanetCandidates().then(data => {
        console.log(data);
        socket.emit("send currentNonConfirmedPlanetCandidates", data);
      });
    });
    socket.on("get k2TargetsFromCampaign9", () => {
      bowshock.exoPlanet.k2TargetsFromCapaign9().then(data => {
        console.log(data);
        socket.emit("send k2TargetsFromCampaign9", data);
      });
    });
    socket.on("get confirmedPlanetsInMissionStarList", koi => {
      bowshock.exoPlanet.confirmedPlanetsInMissionStarList().then(data => {
        console.log(data);
        socket.emit("send confirmedPlanetsInMissionStarList", data);
      });
    });
    socket.on("get allMicrolensingPlanetsWithTimeSeries", () => {
      bowshock.exoPlanet.allMicrolensingPlanetsWithTimeSeries().then(data => {
        console.log(data);
        socket.emit("send allMicrolensingPlanetsWithTimeSeries", data);
      });
    });

    //end of ExoPlanet

    //start of Skymorph
    socket.on(
      "get star data",
      target => {
        bowshock.skymorph
          .search_target_obj(target.target)
          .then(
            data => {
              console.log(data);
              socket.emit("send star data", data);
            },
            err => console.log(err)
          )
          .catch(error => {
            console.log("caught", error.message);
          });
      },
      err => console.log(err)
    );

    socket.on(
      "get star image",
      key => {
        bowshock.skymorph
          .search_image(key)
          .then(
            data => {
              console.log(data);
              socket.emit("send star image", data);
            },
            err => {
              console.log(err);
            }
          )
          .catch(error => {
            console.log("caught", error.message);
          });
      },
      err => console.log(err)
    );

    //end of Skymorph

    //start of img and vid
    socket.on("get media", obj => {
      bowshock.nasaImgVideo.search(obj).then(data => {
        console.log(data);
        socket.emit("send media", data);
      });
    });
    //end of img and vid

    //start of ssc
    socket.on("get observatory", () => {
      bowshock.satelliteSituationCenter.getObservatories().then(data => {
        console.log(data);
        socket.emit("send observatory", data);
      });
    });

    socket.on("get spaseobservatory", () => {
      bowshock.satelliteSituationCenter.getSpaseObservatories().then(data => {
        console.log(data);
        socket.emit("send spaseobservatory", data);
      });
    });

    socket.on("get groundstations", () => {
      bowshock.satelliteSituationCenter.getGroundStations().then(data => {
        console.log(data);
        socket.emit("send groundstations", data);
      });
    });

    socket.on("get locations", () => {
      bowshock.satelliteSituationCenter.getLocations().then(data => {
        console.log(data);
        socket.emit("send locations", data);
      });
    });

    socket.on("get graphs", () => {
      bowshock.satelliteSituationCenter.getGraphs().then(data => {
        console.log(data);
        socket.emit("send groundstations", data);
      });
    });

    socket.on("get conjunctions", () => {
      bowshock.satelliteSituationCenter.getConjunctions().then(data => {
        console.log(data);
        socket.emit("send groundstations", data);
      });
    });
    //end of ssc

    //start ssd
    socket.on("get cad", () => {
      bowshock.ssd.cad().then(data => {
        console.log(data);
        socket.emit("send cad", data);
      });
    });
    socket.on("get fireballs", () => {
      bowshock.ssd.fireballs().then(data => {
        console.log(data);
        socket.emit("send fireballs", data);
      });
    });
    socket.on("get nhats", () => {
      bowshock.ssd.nhats().then(data => {
        console.log(data);
        socket.emit("send nhats", data);
      });
    });
    socket.on("get sentry", () => {
      bowshock.ssd.sentry().then(data => {
        console.log(data);
        socket.emit("send sentry", data);
      });
    });
    //end ssd
  });

  function format_date(date) {
    return moment(new Date(date)).format("YYYY-MM-DD");
  }
};
