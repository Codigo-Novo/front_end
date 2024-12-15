import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PesquisainstituicaoComponent } from './pesquisainstituicao.component';

describe('PesquisainstituicaoComponent', () => {
  let component: PesquisainstituicaoComponent;
  let fixture: ComponentFixture<PesquisainstituicaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PesquisainstituicaoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PesquisainstituicaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
