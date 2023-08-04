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


app.get('/', function (req, res) {
    const totals = settingsBill.totals();

    res.render('index', {
        settings: settingsBill.getSettings(),
        totals: totals,
        warningLevel: settingsBill.hasReachedWarningLevel(),
        criticalLevel: settingsBill.hasReachedCriticalLevel(),
        roundedSms: totals.smsTotal.toFixed(2),
        roundedCall: totals.callTotal.toFixed(2),
        roundedTotal: totals.grandTotal.toFixed(2)
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


    res.redirect('/');

});

app.post('/action', function (req, res) {


    settingsBill.recordAction(req.body.actionType);
    

    res.redirect('/');

});

app.get('/actions', (req, res) => {
    const actionsList = settingsBill.actions();

    actionsList.forEach((action) => {
        action.time = moment(action.time).fromNow(); 
    });

    res.render('actions', {
        actions: actionsList
    });
});

app.get('/actions/:actionType', function (req, res) {
    const actionType = req.params.actionType;

    const actionsTypes = settingsBill.actionsFor(actionType);

    actionsTypes.forEach((action) => {
        action.time = moment(action.time).fromNow(); 
    });

    res.render('actions', {
        actions: actionsTypes
    });
});


let PORT = process.env.PORT || 3011;

app.listen(PORT, function () {

    console.log('App starting on port', PORT);

});