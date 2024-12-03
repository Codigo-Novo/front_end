import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StartdoadorComponent } from './startdoador.component';

describe('StartdoadorComponent', () => {
  let component: StartdoadorComponent;
  let fixture: ComponentFixture<StartdoadorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StartdoadorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StartdoadorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
