import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../base/base.component';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent extends BaseComponent implements OnInit{

  dataLoan: any;

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    this.TestService.getListCustomer().subscribe(res => {
      this.dataTable = res;
      console.log(res);
      console.log(123);
      this.TestService.getListLoan().subscribe(res =>{
        this.dataLoan = res;
      })
      this.spinner.hide();
      this.totalItem = res ? res : 0
      this.totalItemFilter = res ? res.length : 0
    })
  }

   
  pageChange(event) {
    this.page = event
  }
}
