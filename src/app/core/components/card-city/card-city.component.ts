import { Component, OnInit } from '@angular/core';
import { UICity } from '../../models/city.entity';
import { SearchCityService } from '../../services/data-city.service';

@Component({
  selector: 'app-card-city',
  templateUrl: './card-city.component.html',
  styleUrls: ['./card-city.component.scss'],
})
export class CardCityComponent implements OnInit {
  cities: UICity[] = [];

  constructor(private searchCity: SearchCityService) {
    this.cities = this.searchCity.getCitys();
  }

  ngOnInit(): void {
    this.searchCity.sbj.subscribe((data) => {
      this.cities = data;
    });    
  }

  deleteCard(name: string): void {
    this.cities = this.cities.filter( city => city.name !== name)
    this.searchCity.setCitys(this.cities);
  }
}
