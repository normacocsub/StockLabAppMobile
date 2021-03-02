import { Component, OnInit } from '@angular/core';
import { InsumoService } from 'src/app/services/insumo.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {

  constructor(private insumoService: InsumoService) { }

  ngOnInit() {
    this.insumoService.get().then((val)=>{
      if(val != null){
        val.subscribe(result =>{
          if(result != null){
            console.log(result);
          }
        })
      }
    });
  }

}
