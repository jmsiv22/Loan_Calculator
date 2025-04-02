import {
    BindValue,
    BindValueToNumber,
    Change,
    Click,
    Input,
    ValueEvent,
    WebzComponent,
} from "@boots-edu/webz";
import html from "./LoanEntry.component.html";
import css from "./LoanEntry.component.css";
import { Loan } from "../../code/Loan";
import { PaymentDisplayComponent } from "../PaymentDisplay/PaymentDisplay.component";
import { Payment } from "../../code/Payment";

export class LoanEntryComponent extends WebzComponent {
    //Stores an array of the Payments

    private loanTable: PaymentDisplayComponent[] = [];
    private loan: Loan = new Loan(0, 0, 0, 0);

    constructor() {
        super(html, css);
    }

    // Method that removes the old Payments from the screen
    // and loanTable array when recaculating loan payment
    cleanLoanTable(): void {
        //Fix Me - this method should loop through all the items in loanTable and remove each component... clearing all the payment components
        for (let i = 0; i < this.loanTable.length; i++) {
            this.removeComponent(this.loanTable[i]);
        }
    }

    //Fix Me - bind this to loan-amount
    @BindValueToNumber("loan-amount")
    public loanAmount: number = 300000;

    //  This is how you handle input events
    @Input("loan-amount")
    onLoanAmountChange(evt: ValueEvent) {
        this.loanAmount = +evt.value;
    }

    //Fix Me - bind this to interest-rate
    @BindValueToNumber("interest-rate")
    private interestRate: number = 7;

    //  This is how you handle change event
    @Change("interest-rate")
    onInterestRateChange(evt: ValueEvent) {
        this.interestRate = +evt.value;
    }

    //Fix Me - bind this to term
    @BindValueToNumber("term")
    private term: number = 30;

    //Fix Me - Add an input event handler for term
    @Input("term")
    onTermChange(evt: ValueEvent) {
        this.term = +evt.value;
    }

    //Fix Me - Bind this to extra-payment
    @BindValueToNumber("extra-payment")
    private ExtraPayment: number = 100;

    //Fix Me - Add an input event for Extra-Payment
    @Input("extra-payment")
    onExtraPaymentChange(evt: ValueEvent) {
        this.ExtraPayment = +evt.value;
    }

    //Fix Me - Bind this to Scheduled-Payment
    @BindValue("Scheduled-Payment")
    private schedPmt: string = "";

    //Fix Me - Bind this to NbrSchedPayments
    @BindValue("NbrSchedPayments")
    private NbrSchedPayments: string = "";

    //Fix Me - Bind this to Payments-Saved
    @BindValueToNumber("Payments-Saved")
    private PaymentsSaved: number = 0;

    //Fix Me - Bind this to Act-Nbr-Payments
    @BindValue("Act-Nbr-Payments")
    private ActNbrPayments: string = "";

    @BindValue("Total-Payments")
    private TotalPayments: string = "";

    @BindValue("Total-Interest")
    private totInterest: string = "";

    @BindValue("Total-Interest-Saved")
    private totInterestSaved: string = "";

    //  The Payment was altered, call oneTimePayment in Loan class
    AlterExtraPayemnt(PaymentNumber: number, ExtraPaymentAmount: number): void {
        this.loan.oneTimePayment(PaymentNumber, ExtraPaymentAmount);
    }

    @Click("calculate-button")
    calculate() {
        //  Fix Me - Generate this.loan = new Loan(amount, intRate, term, extraPayment)
        this.loan = new Loan(
            this.loanAmount,
            this.interestRate * 0.01,
            this.term,
            this.ExtraPayment,
        );
        //  Fix Me - Call PaintLoanSummary
        this.PaintLoanSummary();
        // If statement for resetting the table
        if (this.loanTable.length > 0) {
            this.cleanLoanTable();
        }

        //  Fix Me - Call PaintPayments()
        this.PaintPayments();
    }

    PaintLoanSummary(): void {
        //  schedPmt - this is the scheduled payment
        this.schedPmt = this.loan
            .getPMT()
            .toLocaleString("en-US", { style: "currency", currency: "USD" });

        //Fix Me - display NbrSchedPayments
        this.NbrSchedPayments = this.loan
            .totalExpectedPaymentCount()
            .toString();
        //Fix Me - display PaymentsSaved
        this.PaymentsSaved = this.loan.paymentsSaved();
        //Fix Me - display totInterest
        this.totInterest = this.loan
            .totalPaidInterest()
            .toLocaleString("en-US", { style: "currency", currency: "USD" });
        //Fix Me - display totInterestSaved
        this.totInterestSaved = (
            this.loan.totalExpectedInterest() - this.loan.totalPaidInterest()
        ).toLocaleString("en-US", { style: "currency", currency: "USD" });
        this.TotalPayments = this.loan
            .totalPaidPayments()
            .toLocaleString("en-US", { style: "currency", currency: "USD" });
        this.ActNbrPayments = this.loan.totalPaymentCount().toString();
    }
    PaintPayments(): void {
        for (let p of this.loan.getPayments()) {
            let pd = new PaymentDisplayComponent(p);
            //Fix me.  Subscribe to the notify in PaymentDisplayComponent
            pd.PaymentNotifier.subscribe(
                (changedPd: PaymentDisplayComponent) => {
                    //  When the event is fired, do the following:
                    //  Call AlterExtraPayment(paymentNumber, ExtraPayment)
                    this.AlterExtraPayemnt(
                        changedPd.payment.getPaymentNumber(),
                        changedPd.payment.getExtraPayment(),
                    );
                    //  Call cleanLoanTable
                    if (this.loanTable.length > 0) {
                        this.cleanLoanTable();
                    }
                    //  Call PaintLoanSummary
                    this.PaintLoanSummary();
                    //  Call PaintPayments
                    this.PaintPayments();
                },
            );

            //  Fix Me Push pd to loanTable
            this.loanTable.push(pd);
            //  Fix Me addComponent pd for idPayment
            this.addComponent(pd, "idPayment");
        }
    }
}
