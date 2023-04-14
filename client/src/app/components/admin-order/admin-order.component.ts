import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ResponseGetOrder } from 'src/app/model/response.getOrder';
import { UpdateOrderDTO } from 'src/app/model/updateOrder.dto';
import { ApiService } from 'src/app/service/api/api.service';

@Component({
  selector: 'app-admin-order',
  templateUrl: './admin-order.component.html',
  styleUrls: ['./admin-order.component.scss']
})
export class AdminOrderComponent implements OnInit {

  constructor(private apiService: ApiService, private router: Router){}
  reference: string = '';
  message: string = '';
  referencia: string = '';
  orderTotal: string = '';
  expirationDate: string = '';
  ean: string = '';
  status: number | undefined;
  btnDisable = true;
  ngOnInit(): void {
    this.checkLocalStorage();
  }

  checkLocalStorage(){
    if(localStorage.getItem('token')){
      //this.router.navigate(['admin-order']);
    }
  }

  toggleButton(){
    this.btnDisable = !this.btnDisable;
  }

  order(){
    let responseOrder: ResponseGetOrder;
    this.apiService.getOrder(this.reference).subscribe(data=>{
      responseOrder = data;
      this.referencia = responseOrder.data.reference;
      this.orderTotal = responseOrder.data.orderTotal;
      this.expirationDate = responseOrder.data.expirationDate;
      this.ean = responseOrder.data.ean;
      this.status = responseOrder.data.status;
      console.log(responseOrder)
    },
    error => {
      if(error.status === 401){
        this.router.navigate(['login'])
      }
    }
    )
  }

  payment(updateOrderDTO: UpdateOrderDTO){
    let responseOrder: ResponseGetOrder;
    this.apiService.payOrder(updateOrderDTO).subscribe(data=>{
      responseOrder = data;
      if(responseOrder.responseCode === 200) {
        this.message = 'Factura pagada exitosamente';
        setTimeout(() => {
          this.message = '';
        }, 2000);
        this.referencia = '';
        this.orderTotal = '';
        this.expirationDate = '';
        this.ean = '';
        this.status = undefined;
      }
    });
  }
}
