import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginainstituicaoComponent } from './paginainstituicao.component';

describe('PaginainstituicaoComponent', () => {
  let component: PaginainstituicaoComponent;
  let fixture: ComponentFixture<PaginainstituicaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaginainstituicaoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaginainstituicaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
