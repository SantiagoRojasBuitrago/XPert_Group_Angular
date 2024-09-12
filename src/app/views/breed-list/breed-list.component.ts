import { Component, OnInit } from '@angular/core';
import { CatService } from '../../../app/services/cat.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router'; 

@Component({
  selector: 'app-breed-list',
  templateUrl: './breed-list.component.html',
  styleUrls: ['./breed-list.component.css'],
  standalone: true,
  imports: [CommonModule],
})
export class BreedListComponent implements OnInit {
  breeds: any[] = [];
  selectedBreed: any;
  images: any[] = [];

  constructor(private catService: CatService, private router: Router) { }

  ngOnInit(): void {
    this.catService.getBreeds().subscribe(breeds => {
      this.breeds = breeds;
    });
  }

  onBreedSelect(event: Event): void {
    const target = event.target as HTMLSelectElement;
    const breedId = target?.value; 

    if (breedId) {
      this.catService.getImagesByBreedId(breedId).subscribe(images => {
        this.images = images;
      });

      this.selectedBreed = this.breeds.find(b => b.id === breedId);
    }
  }

  goBack(): void {
    this.router.navigate(['/home']);  
  }
  
}
