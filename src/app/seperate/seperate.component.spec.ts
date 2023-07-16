import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeperateComponent } from './seperate.component';

describe('SeperateComponent', () => {
  let component: SeperateComponent;
  let fixture: ComponentFixture<SeperateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SeperateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SeperateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
