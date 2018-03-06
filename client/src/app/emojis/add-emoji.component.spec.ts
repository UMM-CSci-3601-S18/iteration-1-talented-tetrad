/*
import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {MatDialogRef, MAT_DIALOG_DATA, MATERIAL_COMPATIBILITY_MODE} from '@angular/material';

import {AddEmojiComponent} from './add-emoji.component';
import {CustomModule} from '../custom.module';

describe('Add emoji component', () => {

    let addEmojiComponent: AddEmojiComponent;
    let calledClose: boolean;
    const mockMatDialogRef = {
        close() { calledClose = true; }
    };
    let fixture: ComponentFixture<AddEmojiComponent>;

    beforeEach(async( () => {
        TestBed.configureTestingModule({
            imports: [CustomModule],
            declarations: [AddEmojiComponent],
            providers: [
                { provide: MatDialogRef, useValue: mockMatDialogRef },
                { provide: MAT_DIALOG_DATA, useValue: null },
                { provide: MATERIAL_COMPATIBILITY_MODE, useValue: true }]
        }).compileComponents().catch(error => {
            expect(error).toBeNull();
        });
    }));

    beforeEach(() => {
        calledClose = false;
        fixture = TestBed.createComponent(AddEmojiComponent);
        addEmojiComponent = fixture.componentInstance;
    });

    it('closes properly', () => {
        addEmojiComponent.onNoClick();
        expect(calledClose).toBe(true);
    });
});

*/
