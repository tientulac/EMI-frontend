import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../base/base.component';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-loan',
  templateUrl: './loan.component.html',
  styleUrls: ['./loan.component.scss']
})
export class LoanComponent extends BaseComponent implements OnInit {
  dataLoan: any;
  record: any;
  resultLoan: any;
  listLoanByCustomer: any;
  titleSubmit: any;
  totalPay: number;

  AddForm = new FormGroup({
    name: new FormControl(null,[Validators.required]),
    amount: new FormControl(null,[Validators.required]),
    tenure: new FormControl(null, [Validators.required]),
    rate: new FormControl(null, [Validators.required]),
  })


  ngOnInit(): void {
    this.getData();
  }

  get checkvalue() {
    return this.AddForm.controls;
  }

  getData() {
    this.TestService.getListCustomer().subscribe(res => {
      this.dataTable = res;
      this.TestService.getListLoan().subscribe(res =>{
        this.dataLoan = res;
      })
      this.spinner.hide();
      this.totalItem = res ? res : 0
      this.totalItemFilter = res ? res.length : 0
    })
  }

  warning(income) {
    if (income < 2000) {
      this.toastr.warning("You income is too low, less than 3000$ you can't make a loan");
    }
  }

  open(content, sizm, type, Data) {
    this.record = Data == '' ? null : Data
    this.selected_ID = Data.id;
    this.submitted = false;
    this.modalServiceOpen(content, sizm);
    switch (type) {
      case "Update":
        this.titleModal = "Loan of " + Data.fullName;
        this.checkInsert = false;
        this.selected_ID = Data.id;
        this.AddForm.patchValue({
          name: '',
          amount: '',
          tenure: '',
          rate: '',
          });
        this.titleSubmit = "Create loan";
        break;
    case "Pay":
        this.titleModal = "Loan of " + Data.fullName;
        this.checkInsert = false;
        this.selected_ID = Data.id;
        this.TestService.getListLoanByCustomer(this.selected_ID).subscribe(res => {
          this.listLoanByCustomer = res[0];
          if(res){
            this.AddForm.patchValue({
              name: !this.listLoanByCustomer ? '' :this.listLoanByCustomer.name,
              amount: !this.listLoanByCustomer ? '' :this.listLoanByCustomer.amount,
              tenure: !this.listLoanByCustomer ? '' :this.listLoanByCustomer.tenure,
              rate: !this.listLoanByCustomer ? '' :this.listLoanByCustomer.rate,
              });
            }
        });
        this.titleSubmit = "Confirm pay";
        break;
    }
  }

  pageChange(event) {
    this.page = event
  }

  onSubmit(){
    let req = {
      name: this.AddForm.value.name,
      amount: this.AddForm.value.amount,
      tenure: this.AddForm.value.tenure,
      rate: this.AddForm.value.rate,
      customer_id: this.selected_ID,
    }
    this.submitted = true;
    if (this.AddForm.invalid) {
      return false;
    }
    this.TestService.insert(req).subscribe(res => {
      if (res) {
        this.TestService.calculateLoan(req).subscribe(res => {
          this.resultLoan = res;
        })
      }
    }) 
    if (this.titleSubmit == "Create loan") {
      this.toastr.success("You create loan successfully and every month you must pay " + this.resultLoan + "$");
    }
    else {
      console.log(this.listLoanByCustomer.amount);
      this.totalPay = this.listLoanByCustomer.amount +  this.resultLoan * this.listLoanByCustomer.tenure;
      this.toastr.success("You have paid total loan is: " + this.totalPay);
    }
  }
}
