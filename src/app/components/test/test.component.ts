import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../base/base.component';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent extends BaseComponent implements OnInit{

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    this.TestService.getListCustomer().subscribe(res => {
      if (res) {
        this.dataTable = res;
        console.log(res)
        this.spinner.hide();
        this.totalItem = res ? res : 0
        this.totalItemFilter = res ? res.length : 0
      }
      else
      {
        this.toastr.warning(res.Message);
        this.spinner.hide();
      }
    }, (err) => {
      this.toastr.error(err.message);
        this.spinner.hide();
    })
  }

   
  pageChange(event) {
    this.page = event
  }
}
