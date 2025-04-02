import { Payment } from "../src/code/Payment";

describe("Test Getters", () => {
    test("(4 pts) Test Getters", () => {
        const payment1 = new Payment(1, 2, 3, 4, 5, 6, 7, 8);
        expect(payment1.getPaymentNumber()).toEqual(1);
        expect(payment1.getBeginningBalance()).toEqual(2);
        expect(payment1.getPaymentAmount()).toEqual(3);
        expect(payment1.getInterestAmount()).toEqual(4);
        expect(payment1.getPrincipleAmount()).toEqual(5);
        expect(payment1.getRemainingBalance()).toEqual(6);
        expect(payment1.getCumulativeInterest()).toEqual(7);
        expect(payment1.getExtraPayment()).toEqual(8);
    });
});
