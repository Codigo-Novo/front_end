import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WordCloudComponent } from './word-cloud.component';

describe('WordCloudComponent', () => {
  let component: WordCloudComponent;
  let fixture: ComponentFixture<WordCloudComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WordCloudComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WordCloudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
