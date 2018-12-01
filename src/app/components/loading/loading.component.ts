import { Component, OnInit, Input } from '@angular/core';
import { NetcineService } from 'src/app/services/netcine.service';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.css']
})
export class LoadingComponent implements OnInit {

  constructor(private netcine: NetcineService) { }

  ngOnInit() {
  }

}
