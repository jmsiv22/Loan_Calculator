import { describe, expect, test, beforeAll } from "@jest/globals";
import { PaymentDisplayComponent } from "./PaymentDisplay.component";
import { bootstrap } from "@boots-edu/webz";
import { Payment } from "../../code/Payment";

describe("PaymentDisplayComponent", () => {
    let component: any = undefined;
    beforeAll(() => {
        const html: string = `<div>Testing Environment</div><div id='main-target'></div>`;
        let p: Payment = new Payment(1, 1, 1, 1, 1, 1, 1, 1);
        component = bootstrap<PaymentDisplayComponent>(
            PaymentDisplayComponent,
            html,
            p,
        );
    });
    describe("Constructor", () => {
        test("Create Instance", () => {
            expect(component).toBeInstanceOf(PaymentDisplayComponent);
        });
    });
});
