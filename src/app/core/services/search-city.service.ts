import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { City } from '../models/city.entity';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class SearchCityService {
  constructor(private http: HttpClient) {}

  getCity(city: string) {
    return this.http
      .get<City>(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&lang=ru&appid=0d32b73323c6c6a7681d913cf8ecee22&units=metric`
      )
      .pipe(
        map((res) => {
          return {
            name: res.name,
            weather: res.weather
            // ...res
          }
        }));
  }
}
