import { Component, Input, OnInit } from '@angular/core';
import { DataService, Number } from '../services/data.service';
import { ModalController } from '@ionic/angular';

export interface results {
  numero: string;
  color: string;
}

@Component({
  selector: 'app-modal',
  templateUrl: './modal.page.html',
  styleUrls: ['./modal.page.scss'],
})

export class ModalPage implements OnInit {

  @Input() id?: string;
  number: Number | null = null;
  numbers: String[] | null = null;
  vals: results[] | null = null;

  constructor(private dataService: DataService, private modalCtrl: ModalController) { }
  
  
  ngOnInit() {
    this.dataService.getNumbersById(this.id).subscribe(res => {
      this.number = res;
      this.vals = [];
      for(let n of res.result.split(",")){
        var col = "black";
        if(Number(n) != 0){
          if(Number(n) % 3 == 0){
            col = "green";
          }else if(Number(n) % 5 == 0){
            col = "red";
          }else if(Number(n) % 7 == 0){
            col = "blue";
          }
        }
        let result :results = {numero: n, color: col}; 
        this.vals?.push(result);

      }
    });
  }

  async deleteNumber(){
    await this.dataService.deleteNumber(this.number as any);
    this.modalCtrl.dismiss();
  }

}
