import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeinstituicaoComponent } from './homeinstituicao.component';

describe('StartinstituicaoComponent', () => {
  let component: HomeinstituicaoComponent;
  let fixture: ComponentFixture<HomeinstituicaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeinstituicaoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeinstituicaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
