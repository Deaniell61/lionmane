import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: []
})
export class FooterComponent implements OnInit {
  constructor() { }
  private _year = new Date().getUTCFullYear();

  ngOnInit(): void {
  }

  set footerYear(value: any) {
    this._year = value;
  }

  get footerYear(): any {
    return this._year;
  }
}
