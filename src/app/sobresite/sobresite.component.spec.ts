import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SobresiteComponent } from './sobresite.component';

describe('SobresiteComponent', () => {
  let component: SobresiteComponent;
  let fixture: ComponentFixture<SobresiteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SobresiteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SobresiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
