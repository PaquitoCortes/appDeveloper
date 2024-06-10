import { Component } from '@angular/core';
import { DataService } from '../services/data.service';
import { AlertController, ModalController } from '@ionic/angular';
import { ModalPage } from '../modal/modal.page';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  numbers : any[] = [];

  constructor(private dataService: DataService, private alertCtrl: AlertController, private modalCtrl: ModalController) {
    this.dataService.getNumbers().subscribe(res =>{
      this.numbers = res;
    })
  }

  async openNumber(number: any){
    const modal = await this.modalCtrl.create({
      component: ModalPage,
      componentProps: {id: number.id },
      breakpoints: [0, 0.5, 0.8],
      initialBreakpoint: 0.5
    });
    modal.present();
  }

  async addNumber(){
    const alert = await this.alertCtrl.create({
      header: 'Add New Number',
      inputs: [
        {
          name: 'input',
          placeholder: 'Type a number',
          type: 'number'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Ready',
          handler: (res) => {
            var result = "";
            var count = 0;
            while(count <= res.input){
              result += count + ",";
              count++;
            }
            this.dataService.addNumber({input: res.input, result: result.substring(0,result.length-1)})
          }
        }
      ]
    });
    await alert.present();
  }

}
