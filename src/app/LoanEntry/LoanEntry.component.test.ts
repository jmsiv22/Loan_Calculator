import { describe, expect, test, beforeAll } from "@jest/globals";
import { LoanEntryComponent } from "./LoanEntry.component";
import { bootstrap } from "@boots-edu/webz";

describe("LoanEntryComponent", () => {
    let component: any = undefined;
    beforeAll(() => {
        const html: string = `<div>Testing Environment</div><div id='main-target'></div>`;
        component = bootstrap<LoanEntryComponent>(LoanEntryComponent, html);
    });
    describe("Constructor", () => {
        test("Create Instance", () => {
            expect(component).toBeInstanceOf(LoanEntryComponent);
        });
    });
});
