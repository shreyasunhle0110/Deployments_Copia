import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-wrapper-angulardotnet-detail',
  templateUrl: './wrapper-angulardotnet-detail.component.html',
  styleUrls: ['./wrapper-angulardotnet-detail.component.css']
})
export class WrapperAngulardotnetDetailComponent implements OnInit {

  systemObject: string = '';
  paymentObject: string = '';
  customerObject: string = '';
  orderObject: string = '';
  otherObject: string = '';
  constructor() { }

  ngOnInit(): void {
    this.systemObject = `
    {
      RedirectSuccessUrl: "successurl.com",
      RedirectFailUrl: "failurl.com",
      RedirectCancelUrl: "cancelurl.com",
      NotificationUrl: "notificationurl.com"
    }`;

    this.paymentObject = `
    {
      country: "IN",
      currency: "INR",
      amount: 10200000,
      payment_option": "all",
      expiry: "2020-01-01T13:02:00+05:30",
      offers: [
        "offer_#111@222",
        "offer_#333@444"
       ]
    }`;

    this.customerObject = `
    {
      customer_firstname: "Ghanshyam",
      customer_lastname: "Subramaniam",
      customer_email: "customer.name@example.com",
      customer_phone: "9843176540"
    }`;

    this.orderObject = `
    {
      "description": "Proceed check out for your order #ORD-438UL748T6",
      "descriptions": [
        {
          "product_name": "Product Item 1",
          "product_id": "PRO-ASDF-1234",
          "unitAmt": 10000,
          "unit": 2,
          "subAmt": 20000
        },
        {
          "product_name": "Product Item 2",
          "product_id": "PRO-JHGF-9876",
          "unitAmt": 50000,
          "unit": 3,
          "subAmt": 150000
        }
      ]
    }`;

    this.otherObject = `
    {
      "udfs": [
        {
          "definition": "Product Image in Base64 format",
          "value": "iVBORw0KGgoAAAANSUhEU..."
        },
        {
          "definition": "Special Notes from Customer",
          "value": "Customer is a non-smoker"
        }
      ]
    }`
  }
}
