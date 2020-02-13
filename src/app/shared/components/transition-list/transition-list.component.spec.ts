import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TransitionListComponent } from './transition-list.component';

describe('TransitionListComponent', () => {
  let component: TransitionListComponent;
  let fixture: ComponentFixture<TransitionListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TransitionListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransitionListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
