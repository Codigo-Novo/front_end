import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileinstituicaoComponent } from './profileinstituicao.component';

describe('ProfileinstituicaoComponent', () => {
  let component: ProfileinstituicaoComponent;
  let fixture: ComponentFixture<ProfileinstituicaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfileinstituicaoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfileinstituicaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
