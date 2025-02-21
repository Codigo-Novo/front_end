import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoacoesdoadorComponent } from './doacoesdoador.component';

describe('DoacoesdoadorComponent', () => {
  let component: DoacoesdoadorComponent;
  let fixture: ComponentFixture<DoacoesdoadorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DoacoesdoadorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DoacoesdoadorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
