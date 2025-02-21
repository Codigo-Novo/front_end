import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoacoesinstituicaoComponent } from './doacoesinstituicao.component';

describe('DoacoesinstituicaoComponent', () => {
  let component: DoacoesinstituicaoComponent;
  let fixture: ComponentFixture<DoacoesinstituicaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DoacoesinstituicaoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DoacoesinstituicaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
