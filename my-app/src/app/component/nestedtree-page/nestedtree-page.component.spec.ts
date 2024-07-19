import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NestedtreePageComponent } from './nestedtree-page.component';

describe('NestedtreePageComponent', () => {
  let component: NestedtreePageComponent;
  let fixture: ComponentFixture<NestedtreePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NestedtreePageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NestedtreePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
