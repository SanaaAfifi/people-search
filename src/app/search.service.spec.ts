import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { SearchService } from './search.service';

describe('SearchService', () => {
  let service: SearchService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [SearchService]
    });
    service = TestBed.inject(SearchService);
    httpMock = TestBed.inject(HttpTestingController);
  });
  afterEach(() => {
    httpMock.verify();
  });
  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('be able to search people from the API with no parameter', () => {
    const dummyPeople = [
      {
        name: 'Luke Skywalker',
        height: '172',
        homeworld: 'http://swapi.dev/api/planets/1/',
        url: 'http://swapi.dev/api/people/1/'
      },
      {
        name: 'Luke Skywalker2',
        height: '172',
        homeworld: 'http://swapi.dev/api/planets/2/',
        url: 'http://swapi.dev/api/people/2/'
      }
    ];
    service.search().subscribe(result => {
      expect(result.length).toBe(2);
      expect(result).toEqual(dummyPeople);
    });
    const request = httpMock.expectOne(`${service.url}`);
    expect(request.request.method).toBe('GET');
    request.flush(dummyPeople);
  });
  it('be able to search people from the API with parameter', () => {
    const dummyPeople = [
      {
        name: 'Luke Skywalker',
        height: '172',
        homeworld: 'http://swapi.dev/api/planets/1/',
        url: 'http://swapi.dev/api/people/1/'
      },
      {
        name: 'Luke Skywalker2',
        height: '172',
        homeworld: 'http://swapi.dev/api/planets/2/',
        url: 'http://swapi.dev/api/people/2/'
      }
    ];
    service.search('filter').subscribe(result => {
      expect(result.length).toBe(2);
      expect(result).toEqual(dummyPeople);
    });
    const request = httpMock.expectOne(`${service.url}filter/`);
    expect(request.request.method).toBe('GET');
    request.flush(dummyPeople);
  });
});
