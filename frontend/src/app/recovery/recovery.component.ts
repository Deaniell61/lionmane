import { Component, OnInit } from '@angular/core';
declare var $: any;
@Component({
  selector: 'app-recovery',
  templateUrl: './recovery.component.html',
  styleUrls: []
})
export class RecoveryComponent implements OnInit {
  constructor() { }
  ngOnInit() {
    $('html, body').animate({ scrollTop: 0 }, '300');
  }
}
