import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { UICity } from '../../models/city.entity';
import { DataCityService } from '../../services/data-city.service';
import { ModalComponent } from '../modal/modal.component';

@Component({
  selector: 'app-card-city',
  templateUrl: './card-city.component.html',
  styleUrls: ['./card-city.component.scss'],
})
export class CardCityComponent implements OnInit {
  cities: UICity[] = [];

  constructor(
    private searchCity: DataCityService,
    public dialog: MatDialog) 
  {
    this.cities = this.searchCity.getCitys();
  }

  ngOnInit(): void {
    this.searchCity.sbj.subscribe((data) => {
      this.cities = data;
    });
  }

  deleteCard(name: string): void {
    this.openDialog(name);
  }

  openDialog(name: string): void {
    this.dialog.open(ModalComponent, {
      data: {
        delete: true,
        cityName: name,
      },
    })
  }
}
