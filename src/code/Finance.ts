export class Finance {
    /*
     * Calculates the PMT (payment) for a loan or annuity based on periodic interest rate, total periods, present value, future value, and loan type.
     * @param periodicInterestRate - periodic interest rate represented as a decimal.
     * @param totalPeriods - number of total payments / periods.
     * @param presentValue- present value -- borrowed or invested principal.
     * @param futureValue - future value of loan or annuity.
     * @param loanType- when payment is made: beginning of period is 1; end, 0.
     * @returns payment amount.
     */
    static calculatePMT(
        periodicInterestRate: number,
        totalPeriods: number,
        presentValue: number,
        futureValue: number = 0,
        loanType: number = 0,
    ): number {
        if (periodicInterestRate === 0) {
            return -(presentValue + futureValue) / totalPeriods;
        }

        let interestFactor = Math.pow(1 + periodicInterestRate, totalPeriods);
        let payment =
            (-periodicInterestRate *
                (presentValue * interestFactor + futureValue)) /
            (interestFactor - 1);

        if (loanType === 1) {
            payment /= 1 + periodicInterestRate;
        }

        return payment;
    }

    /**
     * Calculates the future value of a loan or annuity based on periodic interest rate, total periods, payment amount, present value, and loan type.
     * @param periodicInterestRate - periodic interest rate represented as a decimal.
     * @param totalPeriods - number of total payments / periods.
     * @param pmt - payment amount.
     * @param presentValue - present value -- borrowed or invested principal.
     * @param loanType- when payment is made: beginning of period is 1; end, 0.
     * @returns future value of loan or annuity.
     */
    static calculateFV(
        periodicInterestRate: number,
        totalPeriods: number,
        pmt: number,
        presentValue: number,
        loanType: number,
    ): number {
        return -(
            presentValue * Math.pow(1 + periodicInterestRate, totalPeriods) +
            (pmt *
                (1 + periodicInterestRate * loanType) *
                (Math.pow(1 + periodicInterestRate, totalPeriods) - 1)) /
                periodicInterestRate
        );
    }

    /*
     * Calculates the interest payment for a loan or annuity based on periodic interest rate, period, total periods, present value, future value, and loan type.
     * @param r - periodic interest rate represented as a decimal.
     * @param per - period (payment number) to check value at.
     * @param nper - number of total payments / periods.
     * @param pv - present value -- borrowed or invested principal.
     * @param fv - future value of loan or annuity.
     * @param loanType - when payment is made: beginning of period is 1; end, 0.
     * @returns interest payment.
     */
    static calculateIPMT(
        periodicInterestRate: number,
        period: number,
        totalPeriods: number,
        presentValue: number,
        futureValue: number,
        loanType: number,
    ): number {
        let interestPayment: number =
            Finance.calculateFV(
                periodicInterestRate,
                period - 1,
                Finance.calculatePMT(
                    periodicInterestRate,
                    totalPeriods,
                    presentValue,
                    futureValue,
                    loanType,
                ),
                presentValue,
                loanType,
            ) * periodicInterestRate;

        if (loanType === 1) {
            interestPayment /= 1 + periodicInterestRate;
        }
        return interestPayment;
    }

    /*
     * Calculates the principle payment for a loan or annuity based on periodic interest rate, period, total periods, present value, future value, and loan
     * @param r - periodic interest rate represented as a decimal.
     * @param per - period (payment number) to check value at.
     * @param nper - number of total payments / periods.
     * @param pv - present value -- borrowed or invested principal.
     * @param fv - future value of loan or annuity.
     * @param loanType - when payment is made: beginning of period is 1; end, 0.
     * @returns principle payment.
     */
    static calculatePPMT(
        periodicInterestRate: number,
        period: number,
        totalPeriods: number,
        presentValue: number,
        futureValue: number,
        loanType: number,
    ): number {
        const pmt = Finance.calculatePMT(
            periodicInterestRate,
            totalPeriods,
            presentValue,
            futureValue,
            loanType,
        );
        const interest = Finance.calculateIPMT(
            periodicInterestRate,
            period,
            totalPeriods,
            presentValue,
            futureValue,
            loanType,
        );
        return pmt - interest;
    }
}