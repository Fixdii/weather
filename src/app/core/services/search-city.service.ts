import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { APICity, UICity } from '../models/city.entity';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SearchCityService {
  constructor(private http: HttpClient) {}

  searchCity(city: string): Observable<UICity> {
    return this.http
      .get<APICity>(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&lang=ru&appid=0d32b73323c6c6a7681d913cf8ecee22&units=metric`
      )
      .pipe(
        map((res) => {
          return {
            name: res.name,
            dt: res.dt,
            temp: res.main.temp,
            weather: res.weather.map((weather) => {
              return {
                description: weather.description,
                icon: weather.icon,
              };
            }),
          };
        })
      );
  }

  setCitys(citys: UICity[]): void{
    const jsonData = JSON.stringify(citys)
    localStorage.setItem('citys', jsonData)
  }

  getCitys() {
    return localStorage.getItem('citys')
  }
}
