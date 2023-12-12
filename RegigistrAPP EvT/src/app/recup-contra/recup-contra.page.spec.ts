import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RecupContraPage } from './recup-contra.page';

describe('RecupContraPage', () => {
  let component: RecupContraPage;
  let fixture: ComponentFixture<RecupContraPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(RecupContraPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
