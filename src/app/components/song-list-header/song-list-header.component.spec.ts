import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SongListHeaderComponent } from './song-list-header.component';

describe('SongListHeaderComponent', () => {
  let component: SongListHeaderComponent;
  let fixture: ComponentFixture<SongListHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SongListHeaderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SongListHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
