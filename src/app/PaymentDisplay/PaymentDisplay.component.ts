import {
    BindValue,
    BindValueToNumber,
    Change,
    Notifier,
    ValueEvent,
    WebzComponent,
} from "@boots-edu/webz";
import html from "./PaymentDisplay.component.html";
import css from "./PaymentDisplay.component.css";
import { Payment } from "../../code/Payment";
import { LoanEntryComponent } from "../LoanEntry/LoanEntry.component";

export class PaymentDisplayComponent extends WebzComponent {
    constructor(public payment: Payment) {
        super(html, css);
    }

    //  Fix me - bind this to idPmtNbr
    @BindValueToNumber("idPmtNbr")
    private PmtNumber: number = this.payment.getPaymentNumber();

    //  Fix me - bind this to idBeginningBalance
    @BindValue("idBeginningBalance")
    private BeginningBalance: string = this.payment
        .getBeginningBalance()
        .toLocaleString("en-US", {
            style: "currency",
            currency: "USD",
        });

    //  Fix me - bind this to idScheduledPayment
    @BindValue("idScheduledPayment")
    private SchedulePayment: string = this.payment
        .getPaymentAmount()
        .toLocaleString("en-US", {
            style: "currency",
            currency: "USD",
        });

    //  Fix me - bind this to idExtraPayment
    @BindValue("idExtraPayment")
    private ExtraPayment: string = this.payment
        .getExtraPayment()
        .toLocaleString("en-US", {
            style: "currency",
            currency: "USD",
        });

    //  Fix me - bind this to idTotalPayment
    @BindValue("idTotalPayment")
    private TotalPayment: string = (
        this.payment.getExtraPayment() + this.payment.getPaymentAmount()
    ).toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
    });

    //  Fix me - bind this to idPrinciple
    @BindValue("idPrinciple")
    private PrincplePayment: string = this.payment
        .getPrincipleAmount()
        .toLocaleString("en-US", {
            style: "currency",
            currency: "USD",
        });

    //  Fix me - bind this to idInterest
    @BindValue("idInterest")
    private InterstPayment: string = this.payment
        .getInterestAmount()
        .toLocaleString("en-US", {
            style: "currency",
            currency: "USD",
        });

    @BindValue("idEndingBalance")
    private EndingBalance: string = this.payment
        .getRemainingBalance()
        .toLocaleString("en-US", {
            style: "currency",
            currency: "USD",
        });

    @BindValue("idCummInterest")
    private CummInterest: string = this.payment
        .getCumulativeInterest()
        .toLocaleString("en-US", {
            style: "currency",
            currency: "USD",
        });

    //Fix Me  Add a Notifier for PaymentDisplayComponent
    //Fix Me Add a Change Event for idExtraPayment
    @Change("idExtraPayment")
    onEditExtraPayment(value: ValueEvent) {
        this.payment.setExtraPayment(+value.value);
        //  Fix Me call the notifier
        this.PaymentNotifier.notify(this);
    }
    PaymentNotifier: Notifier<PaymentDisplayComponent> = new Notifier();
}
