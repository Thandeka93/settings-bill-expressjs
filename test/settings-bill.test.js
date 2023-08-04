import assert from "assert";
import SettingsBill from "../settings-bill.js";

describe("Settings-bill", function () {

    const settingsBill = SettingsBill();


    it("should return call cost", function () {

        settingsBill.setSettings({
            "smsCost": 3,
            "callCost": 4,
            "warningLevel": 20,
            "criticalLevel": 30
        });

        assert.equal(4, settingsBill.getSettings().callCost)
    }
    );

    it("should return sms cost", function () {

        settingsBill.setSettings({
            "smsCost": 3,
            "callCost": 4,
            "warningLevel": 20,
            "criticalLevel": 30
        });
        assert.equal(3, settingsBill.getSettings().smsCost)
    }
    );


    it("should return warning level", function () {
        settingsBill.setSettings({
            "smsCost": 3,
            "callCost": 4,
            "warningLevel": 20,
            "criticalLevel": 30
        });

        assert.equal(20, settingsBill.getSettings().warningLevel)
    }
    );

    it("should return critical level", function () {

        settingsBill.setSettings({
            "smsCost": 3,
            "callCost": 4,
            "warningLevel": 20,
            "criticalLevel": 30
        });
        assert.equal(30, settingsBill.getSettings().criticalLevel)
    }
    );

    it("should return total call cost", function () {

        settingsBill.recordAction("call");
        settingsBill.recordAction("call");
        settingsBill.recordAction("call");

        assert.equal(12, settingsBill.totals().callTotal)
    }

    );


    it("should return total sms cost", function () {

        settingsBill.recordAction("sms");
        settingsBill.recordAction("sms");
        settingsBill.recordAction("sms");

        assert.equal(9, settingsBill.totals().smsTotal)
    }

    );

    it("should return grand total", function () {

        assert.equal(21, settingsBill.totals().grandTotal)
    }

    );


});