

const express = require ('express');
// import express from 'express';
const exphbs = require('express-handlebars');
// import exphbs from 'express-handlebars';
const bodyParser = require('body-parser');
// import bodyParser from 'body-parser';
const SettingsBill = require('./settings-bill');


const app = express();
const settingsBill = new SettingsBill();

//setup template handlebars as the template engine
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.use(express.static('public'));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', function (req, res) {
  res.render('index', { 
    settings: settingsBill.getSettings(),
    totals: settingsBill.totals()
  });
});

// app.post('/settings', function (req, res) {
//   settingsBill.setSettings({
//     callCost: req.body.callCost,
//     smsCost: req.body.smsCost,
//     warningLevel: req.body.warningLevel,
//     criticalLevel: req.body.criticalLevel
//   });

//   res.redirect('/');
// });

// app.post('/action', function (req, res) {
//   settingsBill.recordAction(req.body.actionType)
//   res.redirect('/');
// });

// app.get('/actions', function (req, res) {
//   res.render('actions', { actions: settingsBill.actions() });
// });

// app.get('/actions/:actionType', function (req, res) {
//   const actionType = req.params.actionType;
//   res.render('actions', { actions: settingsBill.actionsFor(actionType) });
// });


const PORT = process.env.PORT || 3011;

app.listen(PORT, function () {
  console.log("App started")
});

// // const express = require ('express');
// import express from 'express';
// // const exphbs = require('express-handlebars');
// import exphbs from 'express-handlebars';
// // const bodyParser = require('body-parser');
// import bodyParser from 'body-parser';
// const SettingsBill = require('./settings-bill');

// const app = express();
// const settingsBill = SettingsBill();

// app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
// app.set('view engine', 'handlebars');

// app.use(express.static('public'));

// // parse application/x-www-form-urlencoded
// app.use(bodyParser.urlencoded({ extended: false }))
// // parse application/json
// app.use(bodyParser.json())

// app.get('/', function (req, res) {
//     res.render('index', { 
//         settings: settingsBill.getSettings(),
//         totals: settingsBill.totals()
//     });
// });

// app.post('/settings', function (req, res) {


//     settingsBill.setSettings({
//         callCost: req.body.callCost,
//         smsCost: req.body.smsCost,
//         warningLevel: req.body.warningLevel,
//         criticalLevel: req.body.criticalLevel
//     });

//     // console.log(settingsBill.getSettings());

//     res.redirect('/');
// });

// app.post('/action', function (req, res) {
//     settingsBill.recordAction(req.body.actionType)
//     res.redirect('/');

// });

// app.get('/actions', function (req, res) {
//     res.render('actions', {actions: settingsBill.actions()});

// });

// app.get('/actions/:actionType', function (req, res) {
//     const actionType = req.params.type;
//     res.render('actions', {actions: settingsBill.actionsFor(actionType)});

// });

// const PORT = process.env.PORT || 3011;

// app.listen(PORT, function () {
//     console.log("App started")
// });