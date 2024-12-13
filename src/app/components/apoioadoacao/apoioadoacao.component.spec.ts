import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApoioadoacaoComponent } from './apoioadoacao.component';

describe('ApoioadoacaoComponent', () => {
  let component: ApoioadoacaoComponent;
  let fixture: ComponentFixture<ApoioadoacaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ApoioadoacaoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApoioadoacaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
