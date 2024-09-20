import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RowwiseComponent } from './rowwise.component';

describe('RowwiseComponent', () => {
  let component: RowwiseComponent;
  let fixture: ComponentFixture<RowwiseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RowwiseComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RowwiseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
