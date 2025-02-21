import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResgatardoacaoComponent } from './resgatardoacao.component';

describe('ResgatardoacaoComponent', () => {
  let component: ResgatardoacaoComponent;
  let fixture: ComponentFixture<ResgatardoacaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResgatardoacaoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResgatardoacaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
