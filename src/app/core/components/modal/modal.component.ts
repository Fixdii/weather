import { Component, Inject, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable, Subject } from 'rxjs';
import { map, startWith, takeUntil } from 'rxjs/operators';
import { UICity } from '../../models/city.entity';
import { DataCityService } from '../../services/data-city.service';

export interface DialogData {
  delete: boolean;
  cityName: string;
}

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent implements OnInit {
  private destroy = new Subject<void>();

  myControl = new FormControl();
  options: any[] = ['Брест', 'Минск', 'Moskva', 'Бре', 'Монако', 'Питер'];
  filteredOptions!: Observable<string[]>;
  filterValue: string = '';
  cities: UICity[] = [];
  error = '';

  constructor(
    private searchCity: DataCityService,
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}

  ngOnInit() {
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map((value) => this._filter(value))
    );
    this.cities = this.searchCity.getCitys();
    this.searchCity
      .cityData('')
      .pipe(takeUntil(this.destroy))
      .subscribe((city) => {
        if (city.length > 0) {
          this.options = city;
        }
      });
  }

  private _filter(value: string): string[] {
    this.filterValue = value.toLowerCase();
    this.searchCity.cityData(this.filterValue).subscribe((city) => {
      this.options = city;
    });
    console.log(this.filterValue);
    
    this.error = '';
    return this.options.filter((option) =>
      option.toLowerCase().includes(this.filterValue)
    );
  }

  onSubmit(): void {
    let city = this.cities.find(
      (city) => city.name.toLowerCase() == this.filterValue
    );
    if (city) {
      this.error = 'This city already exists!';
      return;
    }

    this.searchCity
      .searchCity(this.filterValue)
      .pipe(takeUntil(this.destroy))
      .subscribe(
        (data) => {
          if (
            !this.cities.find((city) => city.name == data.name) ||
            undefined
          ) {
            this.cities.push(data);
            this.searchCity.setCitys(this.cities);
          } else {
            this.error = 'This city already exists!';
          }
        },
        (err) => (this.error = "This city doesn't exist!")
      );
  }

  deleteCard(): void {
    this.cities = this.cities.filter(
      (city) => city.name !== this.data.cityName
    );
    this.searchCity.setCitys(this.cities);
    this.closeDialog();
  }

  closeDialog(): void {
    this.dialog.closeAll();
  }

  ngOnDestroy(): void {
    this.destroy.next();
    this.destroy.complete();
  }
}
