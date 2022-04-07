import {Component, OnInit} from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import {map, startWith} from 'rxjs/operators';
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

  constructor(private searchCity: SearchCityService) { }

  ngOnInit() {
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value)),
    );
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    this.searchCity.getCity(filterValue).subscribe( data => {
      console.log(data);      
    })
    // console.log( filterValue);
    
    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }
  
  onSubmit(){

  }

}
