import { Component, OnInit } from '@angular/core';
import { CatService } from '../../../app/services/cat.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router'; 

@Component({
  selector: 'app-breed-table',
  templateUrl: './breed-table.component.html',
  styleUrls: ['./breed-table.component.css'],
  imports: [ FormsModule, CommonModule],
  standalone: true,
})
export class BreedTableComponent implements OnInit {
  breeds: any[] = [];
  filteredBreeds: any[] = [];
  searchTerm: string = '';

  constructor(private catService: CatService, private router: Router) { }

  ngOnInit(): void {
    this.loadBreeds();
  }

  loadBreeds(): void {
    this.catService.getBreeds().subscribe(breeds => {
      this.breeds = breeds;
      this.filteredBreeds = breeds;
    });
  }

  filterBreeds(): void {
    if (this.searchTerm.trim() !== '') {
      this.catService.searchBreeds(this.searchTerm).subscribe(breeds => {
        this.filteredBreeds = breeds;
      });
    } else {
      this.loadBreeds();
    }
  }

  goBack(): void {
    this.router.navigate(['/home']);
  }
  
}
