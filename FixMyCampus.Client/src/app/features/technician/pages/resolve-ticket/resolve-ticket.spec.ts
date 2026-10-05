import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ResolveTicket } from './resolve-ticket';

describe('ResolveTicket', () => {
  let component: ResolveTicket;
  let fixture: ComponentFixture<ResolveTicket>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResolveTicket],
    }).compileComponents();

    fixture = TestBed.createComponent(ResolveTicket);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
