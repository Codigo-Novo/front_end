import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavinstituicaoComponent } from './navinstituicao.component';

describe('NavinstituicaoComponent', () => {
  let component: NavinstituicaoComponent;
  let fixture: ComponentFixture<NavinstituicaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavinstituicaoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NavinstituicaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
