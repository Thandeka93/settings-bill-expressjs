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

describe("The totals function", function(){
    it("It should be able to return total for calls at R2.50 each" , function(){
        let bill = settingsBill();
        bill.setCallCost(2.50)
        bill.setSmsCost(0.70)


        bill.makeCall();
        bill.makeCall();
        bill.makeCall();
        bill.makeCall();

        assert.equal(10.0, bill.getTotalCost())
        assert.equal(10.0, bill.getTotalCallCost())
        assert.equal(0.00, bill.getTotalSmsCost())

    })

    
    it("It should be able to return total for sms at R 0.65 each" , function(){
        let bill = settingsBill();
        bill.setCallCost(0)
        bill.setSmsCost(0.65)


        bill.makeCall();
        bill.makeCall();
        bill.makeCall();
        bill.sendSms();
        bill.sendSms();

        assert.equal(1.30, bill.getTotalCost())
        assert.equal(0.00, bill.getTotalCallCost())
        assert.equal(1.30, bill.getTotalSmsCost())

    });
})

