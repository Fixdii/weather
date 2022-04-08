import { Component, OnInit } from '@angular/core';
import { UICity } from '../../models/city.entity';
import { SearchCityService } from '../../services/search-city.service';

@Component({
  selector: 'app-card-city',
  templateUrl: './card-city.component.html',
  styleUrls: ['./card-city.component.scss']
})
export class CardCityComponent implements OnInit {
  citys: any;
  l: UICity[] = [];
  src = "https://openweathermap.org/img/w/04n.png"
  constructor(private searchCity: SearchCityService) { }

  ngOnInit(): void {
    this.citys = this.searchCity.getCitys()
    this.l = JSON.parse(this.citys)
    console.log(JSON.parse(this.citys));
    
  }

}
