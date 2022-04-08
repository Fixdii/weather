import {Component, OnInit} from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { UICity } from '../../models/city.entity';
import { SearchCityService } from '../../services/search-city.service';


export interface DialogData {
  animal: string;
  name: string;
}


@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {
  myControl = new FormControl();
  options: string[] = ['One', 'Two', 'Three'];
  filteredOptions!: Observable<string[]>;
  filterValue: string = '';
  citys: UICity[] = [];

  constructor(private searchCity: SearchCityService) { }

  ngOnInit() {
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value)),
    );
  }

  private _filter(value: string): string[] {
    this.filterValue = value.toLowerCase();    
    return this.options.filter(option => option.toLowerCase().includes(this.filterValue));
  }
  
  onSubmit(){
    this.searchCity.searchCity(this.filterValue).subscribe(data => {
      this.citys.push(data);      
      this.searchCity.setCitys(this.citys)
    })    

    console.log(this.citys);
  }

  close(){
    console.log(this.citys);    
  }
}
