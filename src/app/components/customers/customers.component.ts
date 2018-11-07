import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import {Customer} from './customer';
import {CustomerService} from '../../services/customer/customer.service';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit {
  customers: Customer[];
  newCustomer: Customer = new Customer();
  editingCustomer: Customer = new Customer();
  editing = false;

  constructor(
    private customerService: CustomerService
  ) { }

  ngOnInit() {
    this.getCustomers();
  }

  getCustomers(): void {
    this.customerService.getCustomers()
      .subscribe(customers => this.customers = customers);
  }

  createCustomer(customerForm: NgForm) {
    this.customerService.createCustomer(this.newCustomer)
      .subscribe(customer => {
        customerForm.reset();
        this.newCustomer = new Customer;
        this.customers.unshift(customer);
      });
  }

  updateCustomer(editedCustomer: Customer): void {
    this.customerService.updateCustomer(editedCustomer)
      .subscribe(customer => {
        const currentCustomer = this.customers.find(item => item.id === item.id);
        Object.assign(currentCustomer, customer);
        this.clearEditing();
      });
  }

  deleteCustomer(id: string): void {
    this.customerService.deleteCustomer(id)
      .subscribe(
        () => this.customers = this.customers.filter(item => item.id !== +id)
      );
  }

  editCustomer(customer: Customer) {
    this.editing = true;
    this.editingCustomer = customer;
  }

  clearEditing(): void {
    this.editing = false;
    this.editingCustomer = new Customer();
  }

}
