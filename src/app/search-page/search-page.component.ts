import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { SearchService } from '../search.service';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.scss'],
  providers: [SearchService]
})
export class SearchPageComponent implements OnInit {
  people = [];
  filterText: string;
  constructor(private searchService: SearchService) {}

  ngOnInit(): void {
    this.searchPeople();
  }
  searchPeople(filterText?: string) {
    this.searchService.search(filterText).subscribe(result => {
      debugger; 
      if (filterText && result.name) {
        this.people = [result];
      } else if (result.count) {
        this.people = result.results;
      } else {
        this.people = [];
      }
    },
    (error) => { this.people = [];});
  }
  onSearchChange(value) {
    this.filterText = value;
    this.searchPeople(this.filterText);
  }
  dropped(event: CdkDragDrop<string[]>) {
    moveItemInArray(
       this.people, 
       event.previousIndex, 
       event.currentIndex
      );
    }
}
