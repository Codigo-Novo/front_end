import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomedoadorComponent } from './homedoador.component';

describe('StartdoadorComponent', () => {
  let component: HomedoadorComponent;
  let fixture: ComponentFixture<HomedoadorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomedoadorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomedoadorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
