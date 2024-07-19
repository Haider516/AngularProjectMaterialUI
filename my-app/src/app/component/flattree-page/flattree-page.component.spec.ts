import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlattreePageComponent } from './flattree-page.component';

describe('FlattreePageComponent', () => {
  let component: FlattreePageComponent;
  let fixture: ComponentFixture<FlattreePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FlattreePageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FlattreePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
