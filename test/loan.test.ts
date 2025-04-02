import { Loan } from "../src/code/Loan";
import { Payment } from "../src/code/Payment";
import { Finance } from "../src/code/Finance";

describe("Test PMT", () => {
    test("(1 pts) Test PMT", () => {
        let PMT = Finance.calculatePMT(0.07 / 12, 360, 300000, 0, 0);
        expect(PMT).toBeCloseTo(-1995.91);
    });
});

describe("Test FV", () => {
    test("(1 pts) Test FV", () => {
        let FV = Finance.calculateFV(0.07 / 12, 360, -2000, 0, 0);
        expect(FV).toBeCloseTo(2439941.99);
    });
});

describe("Test IPMT", () => {
    test("(1 pts) Test IPMT", () => {
        let interest = Finance.calculateIPMT(0.07 / 12, 1, 360, 300000, 0, 0);
        expect(interest).toBeCloseTo(-1750);
    });
});

describe("Test PPMT", () => {
    test("(1 pts) Test PPMT", () => {
        let principle = Finance.calculatePPMT(0.07 / 12, 1, 360, 300000, 0, 0);
        expect(principle).toBeCloseTo(-245.91);
    });
});

describe("Test Loan", () => {
    test("(1 pts) Test Loan Payment Count ", () => {
        let l: Loan = new Loan(300000, 0.07, 30, 100);
        let totPayments: number = l.totalPaymentCount();
        expect(totPayments).toEqual(310);
    });

    test("(1 pts) Test Loan Expected Int ", () => {
        let l: Loan = new Loan(300000, 0.07, 30, 100);
        let totExpectedInt: number = l.totalExpectedInterest();
        expect(totExpectedInt).toBeCloseTo(418526.69);
    });

    test("(1 pts) Test Loan Actual Int ", () => {
        let l: Loan = new Loan(300000, 0.07, 30, 100);
        let totPaidInt: number = l.totalPaidInterest();
        expect(totPaidInt).toBeCloseTo(349188.77);
    });

    test("(1 pts) Test Loan Expected Payments ", () => {
        let l: Loan = new Loan(300000, 0.07, 30, 100);
        let totExpectedPayments: number = l.totalExpectedPayments();
        expect(totExpectedPayments).toBeCloseTo(718526.69);
    });

    test("(1 pts) Test Loan Paid Payments ", () => {
        let l: Loan = new Loan(300000, 0.07, 30, 100);
        let totPaidPayments: number = l.totalPaidPayments();
        expect(totPaidPayments).toBeCloseTo(649188.76);
    });

    test("(1 pts) Test Interest Saved", () => {
        let l: Loan = new Loan(300000, 0.07, 30, 100);
        let intSaved: number = l.interestSaved();
        expect(intSaved).toBeCloseTo(69337.93);
    });

    test("(1 pts) Test Payments Saved", () => {
        let l: Loan = new Loan(300000, 0.07, 30, 100);
        let paymentsSaved: number = l.paymentsSaved();
        expect(paymentsSaved).toEqual(50);
    });

    //  Get Payment #2, run tests
    test("(1 pts) Test Beginning Balance", () => {
        let l: Loan = new Loan(300000, 0.07, 30, 100);
        let p: Payment = l.getSpecificPayment(2);
        expect(p.getBeginningBalance()).toBeCloseTo(299654.09);
    });

    test("(1 pts) Test Remaining Balance", () => {
        let l: Loan = new Loan(300000, 0.07, 30, 100);
        let p: Payment = l.getSpecificPayment(2);
        expect(p.getRemainingBalance()).toBeCloseTo(299306.17);
    });

    test("(1 pts) Test Principle Part", () => {
        let l: Loan = new Loan(300000, 0.07, 30, 100);
        let p: Payment = l.getSpecificPayment(2);
        expect(p.getPrincipleAmount()).toBeCloseTo(347.93);
    });

    test("(1 pts) Test Interest Part", () => {
        let l: Loan = new Loan(300000, 0.07, 30, 100);
        let p: Payment = l.getSpecificPayment(2);
        expect(p.getInterestAmount()).toBeCloseTo(1747.98);
    });

    test("(1 pts) Cumulative Interest", () => {
        let l: Loan = new Loan(300000, 0.07, 30, 100);
        let p: Payment = l.getSpecificPayment(2);
        expect(p.getCumulativeInterest()).toBeCloseTo(3497.98);
    });

    test("(1 pts) Cumulative Interest", () => {
        let l: Loan = new Loan(300000, 0.07, 30, 100);
        l.oneTimePayment(2, 1000);
        let totPaidInt: number = l.totalPaidInterest();
        expect(totPaidInt).toBeCloseTo(344722.77);
    });

    test("(1 pts) Cumulative Interest", () => {
        let l: Loan = new Loan(300000, 0.07, 30, 100);
        l.oneTimePayment(2, 1000);
        let totPayments: number = l.totalPaymentCount();
        expect(totPayments).toEqual(308);
    });
});
