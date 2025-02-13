import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfiledoadorComponent } from './profiledoador.component';

describe('ProfiledoadorComponent', () => {
  let component: ProfiledoadorComponent;
  let fixture: ComponentFixture<ProfiledoadorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfiledoadorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfiledoadorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
