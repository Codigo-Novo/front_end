import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignupinstituicaoComponent } from './signupinstituicao.component';

describe('SignupinstituicaoComponent', () => {
  let component: SignupinstituicaoComponent;
  let fixture: ComponentFixture<SignupinstituicaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SignupinstituicaoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SignupinstituicaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
