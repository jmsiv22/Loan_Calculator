/**
 * Represents a single payment made on a loan.
 * This class has no methods, it is simply a data class.
 * @class Payment
 */
export class Payment {
    getPaymentNumber(): number {
        return this.paymentNumber;
    }

    getBeginningBalance(): number {
        return this.beginningBalance;
    }
    getPaymentAmount(): number {
        return this.paymentAmount;
    }
    getInterestAmount(): number {
        return this.interestAmount;
    }

    getPrincipleAmount(): number {
        return this.principleAmount;
    }

    getRemainingBalance(): number {
        return this.remainingBalance;
    }
    getCumulativeInterest(): number {
        return this.cumulativeInterest;
    }
    getExtraPayment(): number {
        return this.extraPayment;
    }

    setExtraPayment(value: number) {
        this.extraPayment = value;
    }

    getTotalPayment(): number {
        return this.extraPayment + this.paymentAmount;
    }

    setprincipleAmount(value: number): void {
        this.principleAmount = value;
    }

    setRemainingBalance(value: number): void {
        this.remainingBalance = value;
    }

    constructor(
        /**
         * The unique identifier of the payment, assigned in increasing order (1, 2, 3...)
         * @type {number}
         * @memberof Payment
         */
        private paymentNumber: number,
        /**
         * The beginning balance of the loan before the payment is made
         * @type {number}
         * @memberof Payment
         */
        private beginningBalance: number,
        /**
         * The payment amount made
         * @type {number}
         * @memberof Payment
         */
        private paymentAmount: number,
        /**
         * The interest amount paid
         * @type {number}
         * @memberof Payment
         */
        private interestAmount: number,
        /**
         * The principal amount paid
         * @type {number}
         * @memberof Payment
         */
        private principleAmount: number,
        /**
         * The remaining balance of the loan after the payment is made
         * @type {number}
         * @memberof Payment
         */
        private remainingBalance: number,
        /**
         * The total interest paid up to this point
         * @type {number}
         * @memberof Payment
         */
        private cumulativeInterest: number,
        /**
         * The extra payment amount made
         * @type {number}
         * @memberof Payment
         */
        private extraPayment: number,
    ) {}
}
