import { HttpClient, HttpHandler } from '@angular/common/http';
import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { SearchService } from '../search.service';
import { SearchPageComponent } from './search-page.component';
import { of, throwError } from 'rxjs';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

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
  it('sesrchPeople function should empty people array if error thrown from service', () => {
    component.people = ['1', '2'];
    const spy = spyOn(searchService, 'search').and.returnValue(throwError({ status: 404 }));
    component.searchPeople();
    fixture.detectChanges();
    expect(spy).toHaveBeenCalled();
    expect(component.people.length).toEqual(0);
  });
  it('sesrchPeople function should empty people array if search result is empty', () => {
    component.people = ['1', '2'];
    const spy = spyOn(searchService, 'search').and.returnValue(of({detials:'not found'}));
    component.searchPeople();
    fixture.detectChanges();
    expect(spy).toHaveBeenCalled();
    expect(component.people.length).toEqual(0);
  });
  it('edit in search input should onSearchChange', () => {
    spyOn(component, 'onSearchChange');
    let input = fixture.debugElement.query(By.css('.search-input'));
    let el = input.nativeElement;
    expect(el.value).toBe('');
    el.value = '1';
    el.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    expect(component.onSearchChange).toHaveBeenCalledWith('1');
  });
  it('drag and drop should change people array order', () => {
    component.people = [
      {
        name: 'name1',
        url: 'url1',
        height: 'height1',
        homewordl: 'homeworld1'
      },
      {
        name: 'name2',
        url: 'url2',
        height: 'height2',
        homewordl: 'homeworld2'
      }
    ];
    component.dropped({ previousIndex: 0, currentIndex: 1 });
    fixture.detectChanges();
    expect(component.people[0].name).toBe('name2');
  });
});
