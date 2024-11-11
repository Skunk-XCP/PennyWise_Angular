import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinanceCardItemComponent } from './finance-card-item.component';

describe('FinanceCardItemComponent', () => {
  let component: FinanceCardItemComponent;
  let fixture: ComponentFixture<FinanceCardItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FinanceCardItemComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FinanceCardItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
