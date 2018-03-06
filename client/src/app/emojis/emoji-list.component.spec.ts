import {ComponentFixture, TestBed, async} from '@angular/core/testing';
import {Emoji} from './emoji';
import {EmojiListComponent} from './emoji-list.component';
import {EmojiListService} from './emoji-list.service';
import {Observable} from 'rxjs/Observable';
import {FormsModule} from '@angular/forms';
import {CustomModule} from '../custom.module';
import {MATERIAL_COMPATIBILITY_MODE} from '@angular/material';
import {MatDialog} from '@angular/material';

import 'rxjs/add/observable/of';
import 'rxjs/add/operator/do';

describe('Emoji list', () => {

    let emojiList: EmojiListComponent;
    let fixture: ComponentFixture<EmojiListComponent>;

    let emojiListServiceStub: {
        getEmojis: () => Observable<Emoji[]>
    };

    beforeEach(() => {
        // stub UserService for test purposes
        emojiListServiceStub = {
            getEmojis: () => Observable.of([
                {
                    emotion: 'Radiant'
                },
                {
                    emotion: 'Radiant'
                },
                {
                    emotion: 'Sad',
                },
                {
                    emotion: 'Anxious',
                }
            ])
        };

        TestBed.configureTestingModule({
            imports: [CustomModule],
            declarations: [EmojiListComponent],
            // providers:    [ EmojiListService ]  // NO! Don't provide the real service!
            // Provide a test-double instead
            providers: [{provide: EmojiListService, useValue: emojiListServiceStub},
                {provide: MATERIAL_COMPATIBILITY_MODE, useValue: true}]
        });
    });

    beforeEach(async(() => {
        TestBed.compileComponents().then(() => {
            fixture = TestBed.createComponent(EmojiListComponent);
            emojiList = fixture.componentInstance;
            fixture.detectChanges();
        });
    }));

    it('contains all the emojis', () => {
        expect(emojiList.emojis.length).toBe(4);
    });

    it('contains a user with emotion \'Radiant\'', () => {
        expect(emojiList.emojis.some((emoji: Emoji) => emoji.emotion === 'Radiant')).toBe(true);
    });

    it('contains a user with emotion \'Anxious\'', () => {
        expect(emojiList.emojis.some((emoji: Emoji) => emoji.emotion === 'Anxious')).toBe(true);
    });

    it('doesn\'t contain an emoji emotion \'Disgusted\'', () => {
        expect(emojiList.emojis.some((emoji: Emoji) => emoji.emotion === 'Disgusted')).toBe(false);
    });

    it('has two emojis that are Radiant', () => {
        expect(emojiList.emojis.filter((emoji: Emoji) => emoji.emotion === 'Radiant').length).toBe(2);
    });

    it('emoji list filters by emotion', () => {
        expect(emojiList.filteredEmojis.length).toBe(4);
        emojiList.emojiEmotion = 'Rad';
        emojiList.refreshEmojis().subscribe(() => {
            expect(emojiList.filteredEmojis.length).toBe(2);
        });
    });
    /*
        it('user list filters by age', () => {
            expect(userList.filteredUsers.length).toBe(3);
            userList.userAge = 37;
            userList.refreshUsers().subscribe(() => {
                expect(userList.filteredUsers.length).toBe(2);
            });
        });

        it('user list filters by name and age', () => {
            expect(userList.filteredUsers.length).toBe(3);
            userList.userAge = 37;
            userList.userName = 'i';
            userList.refreshUsers().subscribe(() => {
                expect(userList.filteredUsers.length).toBe(1);
            });
        });

    });
    */

    describe('Misbehaving Emoji List', () => {
        let emojiList: EmojiListComponent;
        let fixture: ComponentFixture<EmojiListComponent>;

        let emojiListServiceStub: {
            getEmojis: () => Observable<Emoji[]>
        };

        beforeEach(() => {
            // stub UserService for test purposes
            emojiListServiceStub = {
                getEmojis: () => Observable.create(observer => {
                    observer.error('Error-prone observable');
                })
            };

            TestBed.configureTestingModule({
                imports: [FormsModule, CustomModule],
                declarations: [EmojiListComponent],
                providers: [{provide: EmojiListService, useValue: emojiListServiceStub},
                    {provide: MATERIAL_COMPATIBILITY_MODE, useValue: true}]
            });
        });

        beforeEach(async(() => {
            TestBed.compileComponents().then(() => {
                fixture = TestBed.createComponent(EmojiListComponent);
                emojiList = fixture.componentInstance;
                fixture.detectChanges();
            });
        }));

        it('generates an error if we don\'t set up an EmojiListService', () => {
            // Since the observer throws an error, we don't expect users to be defined.
            expect(emojiList.emojis).toBeUndefined();
        });
    });


    describe('Adding a emoji', () => {
        let emojiList: EmojiListComponent;
        let fixture: ComponentFixture<EmojiListComponent>;
        const newEmoji: Emoji = {
            emotion: 'Radiant',
        };
        const newId = 'emotion_id';

        let calledEmoji: Emoji;

        let emojiListServiceStub: {
            getEmojis: () => Observable<Emoji[]>,
            addNewEmoji: (newEmoji: Emoji) => Observable<{ '$oid': string }>
        };
        let mockMatDialog: {
            open: (AddEmojiComponent, any) => {
                afterClosed: () => Observable<Emoji>
            };
        };

        beforeEach(() => {
            calledEmoji = null;
            // stub UserService for test purposes
            emojiListServiceStub = {
                getEmojis: () => Observable.of([]),
                addNewEmoji: (emojiToAdd: Emoji) => {
                    calledEmoji = emojiToAdd;
                    return Observable.of({
                        '$oid': newId
                    });
                }
            };
            mockMatDialog = {
                open: () => {
                    return {
                        afterClosed: () => {
                            return Observable.of(newEmoji);
                        }
                    };
                }
            };

            TestBed.configureTestingModule({
                imports: [FormsModule, CustomModule],
                declarations: [EmojiListComponent],
                providers: [
                    {provide: EmojiListService, useValue: emojiListServiceStub},
                    {provide: MatDialog, useValue: mockMatDialog},
                    {provide: MATERIAL_COMPATIBILITY_MODE, useValue: true}]
            });
        });

        beforeEach(async(() => {
            TestBed.compileComponents().then(() => {
                fixture = TestBed.createComponent(EmojiListComponent);
                emojiList = fixture.componentInstance;
                fixture.detectChanges();
            });
        }));

        it('calls EmojiListService.addEmoji', () => {
            expect(calledEmoji).toBeNull();
            emojiList.openDialog();
            expect(calledEmoji).toEqual(newEmoji);
        });
    });

});
