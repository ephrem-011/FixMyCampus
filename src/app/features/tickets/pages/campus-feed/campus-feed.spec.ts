import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CampusFeed } from './campus-feed';

describe('CampusFeed', () => {
  let component: CampusFeed;
  let fixture: ComponentFixture<CampusFeed>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CampusFeed],
    }).compileComponents();

    fixture = TestBed.createComponent(CampusFeed);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
