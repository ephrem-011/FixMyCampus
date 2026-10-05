import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DuplicateWarning } from './duplicate-warning';

describe('DuplicateWarning', () => {
  let component: DuplicateWarning;
  let fixture: ComponentFixture<DuplicateWarning>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DuplicateWarning],
    }).compileComponents();

    fixture = TestBed.createComponent(DuplicateWarning);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
