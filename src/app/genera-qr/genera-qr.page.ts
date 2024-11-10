import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { QRCodeModule} from 'angularx-qrcode';






@Component({
  selector: 'app-genera-qr',
  templateUrl: './genera-qr.page.html',
  styleUrls: ['./genera-qr.page.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule,FormsModule,QRCodeModule]
})
export class GeneraQrPage implements OnInit {

  ngOnInit() {
  }

  qrData:string = '' ; //cambiar texto 
  createdCode:string='';




  constructor(private router: Router) { }

  generateQRCode(){

    this.createdCode = this.qrData;

  }
  
toHome2(){
  this.router.navigate(['home2'],  {queryParams:{}} );

}
  

}
