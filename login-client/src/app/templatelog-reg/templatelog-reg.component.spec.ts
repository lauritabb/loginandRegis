import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TemplatelogRegComponent } from './templatelog-reg.component';

describe('TemplatelogRegComponent', () => {
  let component: TemplatelogRegComponent;
  let fixture: ComponentFixture<TemplatelogRegComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TemplatelogRegComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TemplatelogRegComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
