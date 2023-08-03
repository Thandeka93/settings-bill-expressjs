import assert from 'assert';
import settingsBill from '../settings-bill.js';


describe("Warning and Critical level", function(){

    it("It should be able to return 'warning' when warning level is reached" , function(){
        let bill = settingsBill();
        bill.setCallCost(3)
        bill.setSmsCost(1)
        bill.setWarningLevel(15)
        bill.setCriticalLevel(20)


        bill.makeCall();
        bill.makeCall();
        bill.makeCall();
        bill.makeCall();
        bill.sendSms();
        bill.sendSms();
        bill.sendSms();

        assert.equal("warning", bill.totalClassName())

    })

    it("It should be able to return 'critical' when critical level is reached" , function(){
        let bill = settingsBill();
        bill.setCallCost(4.50)
        bill.setSmsCost(1.50)
        bill.setWarningLevel(10)
        bill.setCriticalLevel(25)


        bill.makeCall();
        bill.makeCall();
        bill.makeCall();
        bill.makeCall();
        bill.sendSms();
        bill.sendSms();
        bill.sendSms();
        bill.sendSms();
        bill.sendSms();

        assert.equal(25.5,bill.getTotalCost())
        assert.equal("critical", bill.totalClassName())

    })
})