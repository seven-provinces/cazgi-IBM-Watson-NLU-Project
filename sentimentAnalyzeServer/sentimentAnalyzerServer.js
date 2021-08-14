const express = require('express');
const dotenv = require('dotenv');
dotenv.config();

function getNLUInstance() {
    let api_key = process.env.API_KEY;
    let api_url = process.env.API_URL;

    const NaturalLanguageUnderstandingV1 = require('ibm-watson/natural-language-understanding/v1');
    const { IamAuthenticator } = require('ibm-watson/auth');

    const naturalLanguageUnderstanding = new NaturalLanguageUnderstandingV1({
        version: '2020-08-01',
        authenticator: new IamAuthenticator({
            apikey: api_key,
        }),
        serviceUrl: api_url,
    });
    return naturalLanguageUnderstanding;
}

const app = new express();

app.use(express.static('client'))

const cors_app = require('cors');
app.use(cors_app());

app.get("/",(req,res)=>{
    res.render('index.html');
  });

app.get("/url/emotion", (req,res) => {
    var parameters = {
        'url': req.query.url,
        'features': {
            "emotion": {},
            "categories": {},
            "concepts": {},
            "entities": {},
            "keywords": {}
        }
    };
    var nlu = getNLUInstance();
    nlu.analyze(parameters)
    .then(analysisResults => {
        //res.send("positive");
        //res.send(JSON.stringify(analysisResults.result.sentiment.document.label, null, 2));
        res.send(analysisResults.result.emotion.document.emotion);
        //res.json({query: req.query.text, results: analysisResults.result});
    })
    .catch(err => {
        res.send(err.toString());
    });
    //return res.send({"happy":"90","sad":"10"});
});

app.get("/url/sentiment", (req,res) => {
    var parameters = {
        'url': req.query.url,
        'features': {
            "sentiment": {},
            "categories": {},
            "concepts": {},
            "entities": {},
            "keywords": {}
        }
    };
    var nlu = getNLUInstance();
    nlu.analyze(parameters)
    .then(analysisResults => {
        //res.send("positive");
        //res.send(JSON.stringify(analysisResults.result.sentiment.document.label, null, 2));
        res.send(analysisResults.result.sentiment.document.label);
        //res.json({query: req.query.text, results: analysisResults.result.sentiment});
    })
    .catch(err => {
        res.send(err.toString());
    });
    //return res.send("url sentiment for "+req.query.url);
});

app.get("/text/emotion", (req,res) => {
    var parameters = {
        'text': req.query.text,
        'features': {
            "emotion": {},
            "categories": {},
            "concepts": {},
            "entities": {},
            "keywords": {}
        }
    };
    var nlu = getNLUInstance();
    nlu.analyze(parameters)
    .then(analysisResults => {
        //res.send("positive");
        //res.send(JSON.stringify(analysisResults.result.sentiment.document.label, null, 2));
        res.send(analysisResults.result.emotion.document.emotion);
        //res.json({query: req.query.text, results: analysisResults.result});
    })
    .catch(err => {
        res.send(err.toString());
    });
    //return res.send({"happy":"10","sad":"90"});
});

app.get("/text/sentiment", (req,res) => {
    var parameters = {
        'text': req.query.text,
        'features': {
            "sentiment": {},
            "categories": {},
            "concepts": {},
            "entities": {},
            "keywords": {}
        }
    };
    var nlu = getNLUInstance();
    nlu.analyze(parameters)
    .then(analysisResults => {
        //res.send("positive");
        //res.send(JSON.stringify(analysisResults.result.sentiment.document.label, null, 2));
        res.send(analysisResults.result.sentiment.document.label);
        //res.json({query: req.query.text, results: analysisResults.result.sentiment});
    })
    .catch(err => {
        res.send(err.toString());
    });
    //return res.send("text sentiment for "+req.query.text);
});

let server = app.listen(8080, () => {
    console.log('Listening', server.address().port)
})

