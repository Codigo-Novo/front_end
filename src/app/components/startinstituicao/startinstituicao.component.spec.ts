import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StartinstituicaoComponent } from './startinstituicao.component';

describe('StartinstituicaoComponent', () => {
  let component: StartinstituicaoComponent;
  let fixture: ComponentFixture<StartinstituicaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StartinstituicaoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StartinstituicaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
