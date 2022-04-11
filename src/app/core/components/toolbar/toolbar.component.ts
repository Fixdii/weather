import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { UICity } from '../../models/city.entity';
import { DataCityService } from '../../services/data-city.service';
import { ModalComponent } from '../modal/modal.component';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  private destroy = new Subject<void>();
  
  cities: UICity[] = [];
  update: boolean = false;

  constructor(public dialog: MatDialog, private searchCity: DataCityService) {
    this.searchCity.sbj.pipe(takeUntil(this.destroy)).subscribe((data) => {
      this.cities = data;      
    });
  }

  openDialog() {
    this.dialog.open(ModalComponent, {
      data: {
        delete: false,
      },
    });
  }

  updateData() {
    this.searchCity.startUpdate();
    this.update = !this.update;
  }

  stopUpdate() {
    this.searchCity.stopUpdate();
    this.update = !this.update;
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.destroy.next();
    this.destroy.complete();
  }
}
