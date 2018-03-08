import {ComponentFixture, TestBed} from '@angular/core/testing';
import {By} from '@angular/platform-browser';
import {DebugElement} from '@angular/core';

import {AppModule} from '../app.module';
import {CustomModule} from '../custom.module';
import {HomeComponent} from './home.component';
import {MATERIAL_COMPATIBILITY_MODE} from '@angular/material';

describe('HomeComponent', () => {
    let homeInstance: HomeComponent;
    let homeFixture: ComponentFixture<HomeComponent>;
    let debugElement: DebugElement;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                CustomModule,
                AppModule
            ],
            providers: [{provide: MATERIAL_COMPATIBILITY_MODE, useValue: true}],
        });

        homeFixture = TestBed.createComponent(HomeComponent);

        homeInstance = homeFixture.componentInstance;

        debugElement = homeFixture.debugElement;
    });

    it('should create the app', () => {
        expect(homeFixture).toBeTruthy();
    });

    it(`should be exporting a test variable testingExport`, () => {
        expect(homeInstance.testingExport).toEqual('Hello World!');
    });

    it(`should have a title in a mat card`, () => {
        homeFixture.detectChanges();
        const titleCard: HTMLElement = debugElement.query(By.css('mat-card-title')).nativeElement;
        expect(titleCard.textContent).toContain('Welcome to Mood Flow');
    });

    it('should have a button that says Select an emoji', () => {
       homeFixture.detectChanges();
       const titleButton: HTMLElement = debugElement.query(By.css('button')).nativeElement;
       expect(titleButton.textContent).toContain('Select an Emoji');
    });
});

