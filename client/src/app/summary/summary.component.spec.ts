import {TestBed, ComponentFixture} from '@angular/core/testing';
import {SummaryComponent} from './summary.component';
import {DebugElement} from '@angular/core';
import {By} from '@angular/platform-browser';
import {CustomModule} from '../custom.module';
import {MATERIAL_COMPATIBILITY_MODE} from '@angular/material';

describe('Summary', () => {

    let component: SummaryComponent;
    let fixture: ComponentFixture<SummaryComponent>;
    let de: DebugElement;
    let el: HTMLElement;

/*    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [CustomModule],
            declarations: [SummaryComponent], // declare the test component
            providers: [{provide: MATERIAL_COMPATIBILITY_MODE, useValue: true}],
        });

        fixture = TestBed.createComponent(SummaryComponent);

        component = fixture.componentInstance; // BannerComponent test instance

        // query for the title <h1> by CSS element selector
        de = fixture.debugElement.query(By.css('#hello-world'));
        el = de.nativeElement;
    });

    it('displays a greeting', () => {
        fixture.detectChanges();
        expect(el.textContent).toContain(component.text);
    });*/
});
