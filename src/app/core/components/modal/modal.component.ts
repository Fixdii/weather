import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { UICity } from '../../models/city.entity';
import { SearchCityService } from '../../services/data-city.service';

export interface DialogData {
  animal: string;
  name: string;
}

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent implements OnInit {
  myControl = new FormControl();
  options: string[] = ['Brest', 'Minsk', 'Moskva'];
  filteredOptions!: Observable<string[]>;
  filterValue: string = '';
  cities: UICity[] = [];
  error = '';

  constructor(
    private searchCity: SearchCityService,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map((value) => this._filter(value))
    );
    this.cities = this.searchCity.getCitys();
  }

  private _filter(value: string): string[] {
    this.filterValue = value.toLowerCase();
    this.error = ""
    return this.options.filter((option) =>
      option.toLowerCase().includes(this.filterValue)
    );
  }

  onSubmit() {
    this.searchCity.searchCity(this.filterValue).subscribe((data) => {
      this.cities.push(data);
      this.searchCity.setCitys(this.cities);
    },
    (err) => (this.error = "This city doesn't exist!")
    );
  }

  closeDialog() {
    this.dialog.closeAll();
  }
}
