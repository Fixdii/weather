import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { APICity, City, UICity } from '../models/city.entity';
import { map, tap } from 'rxjs/operators';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataCityService {
  timer: any;
  sbj = new Subject<UICity[]>();

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

  setCitys(cities: UICity[]): void {
    this.sbj.next(cities);
    localStorage.setItem('cities', JSON.stringify(cities));
  }

  getCitys(): UICity[] {
    let cityData: UICity[] = [];
    try {
      cityData = JSON.parse(localStorage.getItem('cities') || '');
    } catch {
      localStorage.setItem('cities', JSON.stringify([]));
    }
    this.sbj.next(cityData);
    return cityData;
  }

  udateData(): void {
    let newData: UICity[] = [];
    let cities: UICity[] = this.getCitys();

    for (const citiy of cities) {
      this.searchCity(citiy.name).subscribe((city) => {
        newData.push(city);
        this.setCitys(newData);
        console.log(city);
      });
    }
    newData = [];
  }

  startUpdate() {
    this.udateData();
    this.timer = setInterval(() => {
      this.udateData();
    }, 600000);
  }

  stopUpdate(): void {
    clearInterval(this.timer);
  }

  cityData(city: string): Observable<City[]> {
    return this.http
      .get<City[]>(
        `http://htmlweb.ru/geo/api.php?json&city_name=${city}&api_key=9dfa3680266d5042237246f656778140`
      )
      .pipe(
        map((response) => {
          if(response){
          return Object.values(response)
            .map((res: any) => {
              if (res['name']) {
                return res['name'];
              }
            })
            .filter((c) => c !== undefined);
          }else{
            return [];
          }
        })
      );
  }
}
