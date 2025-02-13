import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrardoacaoComponent } from './registrardoacao.component';

describe('RegistrardoacaoComponent', () => {
  let component: RegistrardoacaoComponent;
  let fixture: ComponentFixture<RegistrardoacaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegistrardoacaoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegistrardoacaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
