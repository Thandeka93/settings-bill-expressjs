import express from 'express';
import bodyParser from 'body-parser';
import { engine } from 'express-handlebars';
import SettingsBill from './settings-bill.js';
import moment from 'moment';
const app = express();

app.use(express.static('public'));
app.engine('handlebars', engine());

app.set('view engine', 'handlebars');

app.set('views', './views');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())


const settingsBill = SettingsBill();
const settingsBill2 = SettingsBill();

app.get('/', function (req, res) {

    res.render('index', {
        settings: settingsBill.getSettings(),
        totals: settingsBill.totals(),
        warningLevel: settingsBill.hasReachedWarningLevel(),
        criticalLevel: settingsBill.hasReachedCriticalLevel(),
        roundedSms: settingsBill.totals().smsTotal.toFixed(2),
        roundedCall: settingsBill.totals().callTotal.toFixed(2),
        roundedTotal: settingsBill.totals().grandTotal.toFixed(2),



    });


});

app.post('/settings', function (req, res) {

    settingsBill.setSettings({

        callCost: req.body.callCost,
        smsCost: req.body.smsCost,
        warningLevel: req.body.warningLevel,
        criticalLevel: req.body.criticalLevel
    }

    );


    settingsBill2.setSettings({

        callCost: req.body.callCost,
        smsCost: req.body.smsCost,
        warningLevel: req.body.warningLevel,
        criticalLevel: req.body.criticalLevel
    }

    );

    res.redirect('/');

});

app.post('/action', function (req, res) {


    settingsBill.recordAction(req.body.actionType);
    settingsBill2.recordAction(req.body.actionType);

    res.redirect('/');

});

app.get('/actions', function (req, res) {

    var actionsList = settingsBill.actions();


    const holder = settingsBill2.actions();

    var staticTime = [];

    for (let i = 0; i < holder.length; ++i) {


        staticTime.push(holder[i].time);

    }

    for (let i = 0; i < actionsList.length; ++i) {

        //  var result= actionsList[i].time;

        actionsList[i].time = moment(staticTime[i]).fromNow();


    }

    res.render('actions', {
        actions: actionsList

    });


});

app.get('/actions/:actionType', function (req, res) {

    const actionType = req.params.actionType;

    var actionsTypes = settingsBill.actionsFor(actionType);

    const holder = settingsBill2.actionsFor(actionType);
    var staticTime = [];

    for (let i = 0; i < holder.length; ++i) {


        staticTime.push(holder[i].time);

    }

    for (let i = 0; i < actionsTypes.length; ++i) {

        actionsTypes[i].time = moment(staticTime[i]).fromNow();

    }

    res.render('actions', {
        actions: actionsTypes

    });

});


let PORT = process.env.PORT || 3011;

app.listen(PORT, function () {

    console.log('App starting on port', PORT);

});