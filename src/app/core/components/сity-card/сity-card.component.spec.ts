import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SityCardComponent } from './сity-card.component';

describe('SityCardComponent', () => {
  let component: SityCardComponent;
  let fixture: ComponentFixture<SityCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SityCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SityCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
