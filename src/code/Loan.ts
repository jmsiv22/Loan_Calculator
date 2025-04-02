import { Payment } from "./Payment";
import { Finance } from "./Finance";

export class Loan {
    //  PMT is the calculated/required PMT payment amount to make on the loan
    private pmt: number;

    //  Payments[] - Array of expected payments on the loan
    private payments: Payment[] = [];

    constructor(
        public loanAmount: number,
        public interestRate: number,
        public loanLength: number,
        public extraPayment: number,
    ) {
        //  set this.PMT using Finance.PMT.

        this.pmt = Math.abs(
            Finance.calculatePMT(
                interestRate / 12,
                loanLength * 12,
                loanAmount,
                0,
                0,
            ),
        );
        let paymentNumber: number = 0;
        this.createPayments(paymentNumber, loanAmount, 0);
    }

    /**
     * Rounds a number to a specified number of decimal places
     * @param num - number to round
     * @param places - number of decimal places to round to
     * @returns rounded number
     */
    static roundTo(num: number, places: number): number {
        const factor = 10 ** places;
        return Math.round(num * factor) / factor;
    }

    getPMT(): number {
        return Math.abs(this.pmt);
    }

    getPayments(): Payment[] {
        return this.payments;
    }

    /**
     * How much interest would be paid on the loan if no extra payments are made
     * @returns total expected interest
     */
    totalExpectedInterest(): number {
        return this.pmt * this.totalExpectedPaymentCount() - this.loanAmount;
    }

    //  TotalExpectedPayments - The total amount of expected payments, if no extra payments are made
    totalExpectedPayments(): number {
        return this.pmt * this.totalExpectedPaymentCount();
    }

    totalPaidInterest(): number {
        let totInt: number = 0;
        for (let p of this.payments) {
            totInt += p.getInterestAmount();
        }
        return totInt;
    }

    totalPaidPayments(): number {
        let totPmt: number = 0;
        for (let p of this.payments) {
            totPmt += p.getPaymentAmount() + p.getExtraPayment();
        }
        return totPmt;
    }

    interestSaved(): number {
        return this.totalExpectedInterest() - this.totalPaidInterest();
    }

    paymentsSaved(): number {
        return this.totalExpectedPaymentCount() - this.totalPaymentCount();
    }

    totalPaymentCount(): number {
        return this.payments.length;
    }

    totalExpectedPaymentCount(): number {
        return this.loanLength * 12;
    }

    getSpecificPayment(paymentNumber: number): Payment {
        return this.payments[paymentNumber - 1];
    }

    oneTimePayment(paymentNumber: number, lumpSumAmount: number): void {
        let newPayments: Payment[] = [];

        let currentPayment: Payment = new Payment(0, 0, 0, 0, 0, 0, 0, 0);

        for (let i = 0; i < this.payments.length - 1; i++) {
            if (paymentNumber > this.payments[i].getPaymentNumber()) {
                newPayments.push(this.payments[i]);
            }
            if (paymentNumber === this.payments[i].getPaymentNumber()) {
                currentPayment = this.payments[i];
                break;
            }
        }
        this.payments = newPayments;
        paymentNumber = currentPayment.getPaymentNumber();
        currentPayment.setExtraPayment(lumpSumAmount);
        currentPayment.setprincipleAmount(
            currentPayment.getPaymentAmount() -
                currentPayment.getInterestAmount() +
                lumpSumAmount,
        );
        currentPayment.setRemainingBalance(
            currentPayment.getBeginningBalance() -
                currentPayment.getPrincipleAmount(),
        );
        newPayments.push(currentPayment);
        this.createPayments(
            paymentNumber,
            currentPayment.getRemainingBalance(),
            currentPayment.getCumulativeInterest(),
        );
    }

    createPayments(
        paymentNumber: number,
        startingLoanAmount: number,
        cumulativeInterest: number,
    ): void {
        let loanBalance: number = startingLoanAmount;
        let PmtNbr: number = paymentNumber;

        while (loanBalance > this.getPMT()) {
            //  Create a payment when there's still a balance
            //  Figure out the PaymentNumber
            PmtNbr++;

            //  Calculate pmtInterst (loan interest) based on loanbalance * this.interestrate/12
            let pmtInterest: number = loanBalance * (this.interestRate / 12);

            //  Accumulate interst in cummInterest
            cumulativeInterest += pmtInterest;

            //  Calculate PmtSchedulePmt
            let pmtScheduledPayment: number = this.pmt;

            //  Calculate PmtPrinciple

            if (
                this.extraPayment + pmtScheduledPayment - pmtInterest >
                loanBalance
            ) {
                this.extraPayment =
                    loanBalance - pmtScheduledPayment + pmtInterest;
            }

            let pmtPrinciple: number =
                pmtScheduledPayment + this.extraPayment - pmtInterest;

            //  Don't forget to deal with extra payment
            //  Calculate PmtEndingBalance
            let pmtEndingBalance: number = loanBalance - pmtPrinciple;

            //  Create a payment
            let newPayment: Payment = new Payment(
                PmtNbr,
                loanBalance,
                pmtScheduledPayment,
                pmtInterest,
                pmtPrinciple,
                pmtEndingBalance,
                cumulativeInterest,
                this.extraPayment,
            );
            this.payments.push(newPayment);

            loanBalance -= pmtPrinciple;

            //  You may have to look for really small amounts to break (0.0000000000000000000001)
            if (Loan.roundTo(loanBalance, 2) == 0) {
                break;
            }
        }

        //  Handle the final payment (if needed)
        //  Merry Christmas... I'm giving you this code...  how to handle the final payment
        //  (if there is a final payment)
        if (Loan.roundTo(loanBalance, 2) > 0.01) {
            PmtNbr++;
            let pmtInterest: number = Loan.roundTo(
                loanBalance * (this.interestRate / 12),
                2,
            );
            cumulativeInterest += pmtInterest;

            let pmtPrinciple: number = Loan.roundTo(
                loanBalance - pmtInterest,
                2,
            );
            let pmtScheduledPayment =
                Loan.roundTo(loanBalance, 2) + pmtInterest;

            let newPayment: Payment = new Payment(
                PmtNbr,
                loanBalance,
                pmtScheduledPayment,
                pmtInterest,
                pmtPrinciple,
                0.0,
                cumulativeInterest,
                0,
            );
            this.payments.push(newPayment);
        }
    }
}
