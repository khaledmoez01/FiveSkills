import { Component, OnInit } from '@angular/core';
import { DashboardService } from 'src/app/services/dashboard.service';
import { async } from 'q';

@Component({
  selector: 'app-home-d',
  templateUrl: './home-d.component.html',
  styleUrls: ['./home-d.component.css']
})
export class HomeDComponent implements OnInit {
  Nomb:any;
  constructor(private DasboardService:DashboardService) { }

  ngOnInit() {
    this.DasboardService.nombre().subscribe(async tot =>{
      this.Nomb=tot;
      console.log(this.Nomb)
    })
  }

}
