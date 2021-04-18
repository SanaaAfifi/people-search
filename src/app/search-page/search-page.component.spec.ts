import { HttpClient, HttpHandler } from '@angular/common/http';
import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { SearchService } from '../search.service';
import { SearchPageComponent } from './search-page.component';
import { of } from 'rxjs';
import { DebugElement } from '@angular/core';

describe('SearchPageComponent', () => {
  let component: SearchPageComponent;
  let fixture: ComponentFixture<SearchPageComponent>;
  let searchService: SearchService;
  let debugElement: DebugElement;
  
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SearchPageComponent],
      providers: [SearchService, HttpClient, HttpHandler]
    }).compileComponents();
  }));
  beforeEach(() => {
    fixture = TestBed.createComponent(SearchPageComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement; 
    searchService = debugElement.injector.get(SearchService);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('ngOnInit should call searchPeople', () => {
    spyOn(component, 'searchPeople');
    component.ngOnInit();
    expect(component.searchPeople).toHaveBeenCalled();
  });
  it('onSearchChange should change filterText & call searchPeople', () => {
    spyOn(component, 'searchPeople');
    component.onSearchChange('txt');
    expect(component.searchPeople).toHaveBeenCalledWith('txt');
    expect(component.filterText).toBe('txt');
  });
  it('onSearchChange should change filterText to empty & call searchPeople', () => {
    spyOn(component, 'searchPeople');
    component.onSearchChange('');
    expect(component.searchPeople).toHaveBeenCalledWith('');
    expect(component.filterText).toBe('');
  });
  it('searchPeople function should call searchService.search , filter parameter is empty', async(() => {
    const spy = spyOn(searchService, 'search').and.returnValue(of({ count: 1, results: [1, 2] }));
    component.searchPeople(); 
    fixture.detectChanges();
    expect(spy).toHaveBeenCalled();
    expect(component.people.length).toEqual(2);
    expect(component.people[0]).toEqual(1);
  }));
  it('searchPeople function should call searchService.search, filter parameter has value', async(() => {
    const spy = spyOn(searchService, 'search').and.returnValue(of({ name: 'name' }));
    component.searchPeople('txt'); 
    fixture.detectChanges();
    expect(spy).toHaveBeenCalled();
    expect(component.people.length).toEqual(1);
    expect(component.people[0].name).toBe('name');
  }));
});
