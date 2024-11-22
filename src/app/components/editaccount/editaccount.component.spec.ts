import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditaccountComponent } from './editaccount.component';

describe('EditaccountComponent', () => {
  let component: EditaccountComponent;
  let fixture: ComponentFixture<EditaccountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditaccountComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditaccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
