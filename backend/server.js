const request = require('request');
var express = require("express");
var app = express();

var router = express.Router();
var bodyParser = require('body-parser');

app.use(bodyParser.json());

//app.use(express.static('public'));
app.use(express.static(__dirname));


router.use(function (req, res, next) {
    console.log("/" + req.method);
    next();
});

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, PATCH, PUT, DELETE, OPTIONS"
    );
    next();
});

//get method for nytimesearch
app.get("/searchNytimes", function (req, res) {
    var val = req.query.val
    var result = {}
    console.log('https://api.nytimes.com/svc/search/v2/articlesearch.json?fq=web_url:(%22' + val + '%22)%20&api-key=2GY7A4N6WecQAiwk8gR8HtrkBTb5wlSn')
    request('https://api.nytimes.com/svc/search/v2/articlesearch.json?fq=web_url:(%22' + val + '%22)%20&api-key=2GY7A4N6WecQAiwk8gR8HtrkBTb5wlSn', { json: true }, (err, response, body) => {
        if (err) { return console.log(err); }
        console.log(body)
        res.send(body)
    });

});

app.get("/searchGuardian", function (req, res) {
    var val = req.query.val
    result = {}
    request('https://content.guardianapis.com/' + val + '?api-key=2ab573c1-5426-4d28-96c4-bf13d2a166b5&show-blocks=all', { json: true }, (err, response, body) => {
        if (err) { return console.log(err); }
        res.send(body)
    });
});

app.get("/Guardian", function (req, res) {
    //var val = req.query.val
    result = {}
    request('https://content.guardianapis.com/search?api-key=2ab573c1-5426-4d28-96c4-bf13d2a166b5&section=(sport|business|technology|politics)&show-blocks=all', { json: true }, (err, response, body) => {
        if (err) { return console.log(err); }
        res.send(body)
    });
});

app.get("/Nytimes", function (req, res) {
    //var val = req.query.val
    result = {}
    flag = 0
    request('https://api.nytimes.com/svc/topstories/v2/home.json?api-key=2GY7A4N6WecQAiwk8gR8HtrkBTb5wlSn', { json: true }, (err, response, body) => {
        if (err) { return console.log(err); }
        resu = body
        if (body.results) {
            for (i = 0; i < body.results.length; i++) {
                if (body.results[i].multimedia) {
                    for (j = 0; j < body.results[i].multimedia.length; j++) {
                        if (body.results[i].multimedia[j].width >= 2000) {
                            resu.results[i].multimedia.unshift({ url: body.results[i].multimedia[j].url })
                            flag = 1
                            break
                        }
                    }
                    if (flag == 0) {
                        tempobj = { url: "https://upload.wikimedia.org/wikipedia/commons/0/0e/Nytimes_hq.jpg" }
                        resu.results[i].multimedia.unshift(tempobj)
                    }
                    flag = 0
                }
            }
        }
        res.send(resu)
        //res.send(body)
    });
});



/////////////////////////Politics////////////////////////////////
app.get("/GuardianPol", function (req, res) {
    //var val = req.query.val
    result = {}
    request('https://content.guardianapis.com/politics?api-key=2ab573c1-5426-4d28-96c4-bf13d2a166b5&show-blocks=all', { json: true }, (err, response, body) => {
        if (err) { return console.log(err); }
        res.send(body)
    });
});

app.get("/NytimesPol", function (req, res) {
    //var val = req.query.val
    result = {}
    flag = 0
    request('https://api.nytimes.com/svc/topstories/v2/politics.json?api-key=2GY7A4N6WecQAiwk8gR8HtrkBTb5wlSn', { json: true }, (err, response, body) => {
        if (err) { return console.log(err); }
        resu = body
        if (body.results) {
            for (i = 0; i < body.results.length; i++) {
                if (body.results[i].multimedia) {
                    for (j = 0; j < body.results[i].multimedia.length; j++) {
                        if (body.results[i].multimedia[j].width >= 2000) {
                            resu.results[i].multimedia.unshift({ url: body.results[i].multimedia[j].url })
                            flag = 1
                            break
                        }
                    }
                    if (flag == 0) {
                        tempobj = { url: "https://upload.wikimedia.org/wikipedia/commons/0/0e/Nytimes_hq.jpg" }
                        resu.results[i].multimedia.unshift(tempobj)
                    }
                    flag = 0
                }
            }
        }
        res.send(resu)
        //res.send(body)
    });
});


//////////////////World///////////////////////////////////////////
app.get("/GuardianWor", function (req, res) {
    //var val = req.query.val
    result = {}
    request('https://content.guardianapis.com/world?api-key=2ab573c1-5426-4d28-96c4-bf13d2a166b5&show-blocks=all', { json: true }, (err, response, body) => {
        if (err) { return console.log(err); }
        res.send(body)
    });
});

app.get("/NytimesWor", function (req, res) {
    //var val = req.query.val
    result = {}
    flag = 0
    request('https://api.nytimes.com/svc/topstories/v2/world.json?api-key=2GY7A4N6WecQAiwk8gR8HtrkBTb5wlSn', { json: true }, (err, response, body) => {
        if (err) { return console.log(err); }
        resu = body
        if (body.results) {
            for (i = 0; i < body.results.length; i++) {
                if (body.results[i].multimedia) {
                    for (j = 0; j < body.results[i].multimedia.length; j++) {
                        if (body.results[i].multimedia[j].width >= 2000) {
                            resu.results[i].multimedia.unshift({ url: body.results[i].multimedia[j].url })
                            flag = 1
                            break
                        }
                    }
                    if (flag == 0) {
                        tempobj = { url: "https://upload.wikimedia.org/wikipedia/commons/0/0e/Nytimes_hq.jpg" }
                        resu.results[i].multimedia.unshift(tempobj)
                    }
                    flag = 0
                }
            }
        }
        res.send(resu)
    });
});


//////////////Tech///////////////////////

app.get("/GuardianTec", function (req, res) {
    //var val = req.query.val
    result = {}
    request('https://content.guardianapis.com/technology?api-key=2ab573c1-5426-4d28-96c4-bf13d2a166b5&show-blocks=all', { json: true }, (err, response, body) => {
        if (err) { return console.log(err); }
        res.send(body)
    });
});

app.get("/NytimesTec", function (req, res) {
    //var val = req.query.val
    result = {}
    flag = 0
    request('https://api.nytimes.com/svc/topstories/v2/technology.json?api-key=2GY7A4N6WecQAiwk8gR8HtrkBTb5wlSn', { json: true }, (err, response, body) => {
        if (err) { return console.log(err); }
        resu = body
        if (body.results) {
            for (i = 0; i < body.results.length; i++) {
                if (body.results[i].multimedia) {
                    for (j = 0; j < body.results[i].multimedia.length; j++) {
                        if (body.results[i].multimedia[j].width >= 2000) {
                            resu.results[i].multimedia.unshift({ url: body.results[i].multimedia[j].url })
                            flag = 1
                            break
                        }
                    }
                    if (flag == 0) {
                        tempobj = { url: "https://upload.wikimedia.org/wikipedia/commons/0/0e/Nytimes_hq.jpg" }
                        resu.results[i].multimedia.unshift(tempobj)
                    }
                    flag = 0
                }
            }
        }
        res.send(resu)
    });
});


///////////////////Business//////////////////////
app.get("/GuardianBus", function (req, res) {
    //var val = req.query.val
    result = {}
    request('https://content.guardianapis.com/business?api-key=2ab573c1-5426-4d28-96c4-bf13d2a166b5&show-blocks=all', { json: true }, (err, response, body) => {
        if (err) { return console.log(err); }
        res.send(body)
    });
});

app.get("/NytimesBus", function (req, res) {
    //var val = req.query.val
    result = {}
    flag = 0
    request('https://api.nytimes.com/svc/topstories/v2/business.json?api-key=2GY7A4N6WecQAiwk8gR8HtrkBTb5wlSn', { json: true }, (err, response, body) => {
        if (err) { return console.log(err); }
        resu = body
        if (body.results) {
            for (i = 0; i < body.results.length; i++) {
                if (body.results[i].multimedia) {
                    for (j = 0; j < body.results[i].multimedia.length; j++) {
                        if (body.results[i].multimedia[j].width >= 2000) {
                            resu.results[i].multimedia.unshift({ url: body.results[i].multimedia[j].url })
                            flag = 1
                            break
                        }
                    }
                    if (flag == 0) {
                        tempobj = { url: "https://upload.wikimedia.org/wikipedia/commons/0/0e/Nytimes_hq.jpg" }
                        resu.results[i].multimedia.unshift(tempobj)
                    }
                    flag = 0
                }
            }
        }
        res.send(resu)
    });
});


/////////////////////Sports/////////////////////////////
app.get("/GuardianSpo", function (req, res) {
    //var val = req.query.val
    result = {}
    request('https://content.guardianapis.com/sport?api-key=2ab573c1-5426-4d28-96c4-bf13d2a166b5&show-blocks=all', { json: true }, (err, response, body) => {
        if (err) { return console.log(err); }
        res.send(body)
    });
});

app.get("/NytimesSpo", function (req, res) {
    //var val = req.query.val
    result = {}
    flag = 0
    request('https://api.nytimes.com/svc/topstories/v2/sports.json?api-key=2GY7A4N6WecQAiwk8gR8HtrkBTb5wlSn', { json: true }, (err, response, body) => {
        if (err) { return console.log(err); }
        resu = body
        if (body.results) {
            for (i = 0; i < body.results.length; i++) {
                if (body.results[i].multimedia) {
                    for (j = 0; j < body.results[i].multimedia.length; j++) {
                        if (body.results[i].multimedia[j].width >= 2000) {
                            resu.results[i].multimedia.unshift({ url: body.results[i].multimedia[j].url })
                            flag = 1
                            break
                        }
                    }
                    if (flag == 0) {
                        tempobj = { url: "https://upload.wikimedia.org/wikipedia/commons/0/0e/Nytimes_hq.jpg" }
                        resu.results[i].multimedia.unshift(tempobj)
                    }
                    flag = 0
                }
            }
        }
        res.send(resu)
    });
});

app.get("/barsearchGuardian", function (req, res) {
    var val = req.query.val
    result = {}
    request('https://content.guardianapis.com/search?q=' + val + '&api-key=2ab573c1-5426-4d28-96c4-bf13d2a166b5&show-blocks=all', { json: true }, (err, response, body) => {
        if (err) { return console.log(err); }
        res.send(body)
    });
});


app.get("/barsearchNytimes", function (req, res) {
    var val = req.query.val
    result = {}
    flag = 0
    request('https://api.nytimes.com/svc/search/v2/articlesearch.json?q=' + val + '&api-key=2GY7A4N6WecQAiwk8gR8HtrkBTb5wlSn', { json: true }, (err, response, body) => {
        if (err) { return console.log(err); }
        resu = body
        //console.log(body.response.docs)

        if (body.response.docs) {
            for (i = 0; i < body.response.docs.length; i++) {
                if (body.response.docs[i].multimedia) {
                    console.log(body.response.docs[i].multimedia)
                    for (j = 0; j < body.response.docs[i].multimedia.length; j++) {
                        if (body.response.docs[i].multimedia[j].width >= 2000) {
                            resu.response.docs[i].multimedia.unshift({ url: body.response.docs[i].multimedia[j].url })
                            flag = 1
                            break
                        }
                    }
                    if (flag == 0) {
                        tempobj = { url: "https://upload.wikimedia.org/wikipedia/commons/0/0e/Nytimes_hq.jpg" }
                        resu.response.docs[i].multimedia.unshift(tempobj)
                    }
                    flag = 0
                }
            }
        }
        res.send(resu)

        //res.send(body)
    });

});





app.use("/", router);
const debug = require("debug")("Shashank");
const http = require("http");

const normalizePort = val => {
    var port = parseInt(val, 10);

    if (isNaN(port)) {
        // named pipe
        return val;
    }

    if (port >= 0) {
        // port number
        return port;
    }

    return false;
};

const onError = error => {
    if (error.syscall !== "listen") {
        throw error;
    }
    const bind = typeof addr === "string" ? "pipe " + addr : "port " + port;
    switch (error.code) {
        case "EACCES":
            console.error(bind + " requires elevated privileges");
            process.exit(1);
            break;
        case "EADDRINUSE":
            console.error(bind + " is already in use");
            process.exit(1);
            break;
        default:
            throw error;
    }
};

const onListening = () => {
    const addr = server.address();
    const bind = typeof addr === "string" ? "pipe " + addr : "port " + port;
    debug("Listening on " + bind);
};

const port = normalizePort(process.env.PORT || "8080");

const server = http.createServer(app);
server.on("error", onError);
server.on("listening", onListening);
server.listen(port);
console.log(port)












