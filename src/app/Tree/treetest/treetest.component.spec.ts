import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TreetestComponent } from './treetest.component';

describe('TreetestComponent', () => {
  let component: TreetestComponent;
  let fixture: ComponentFixture<TreetestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TreetestComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TreetestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
