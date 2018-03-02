import {Component} from '@angular/core';

@Component({
    templateUrl: 'summary.component.html'
})
export class SummaryComponent {
    public text: string;

    constructor() {
        this.text = 'Mongo lab';
    }
}
