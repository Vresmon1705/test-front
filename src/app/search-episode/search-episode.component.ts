import { Component, OnInit } from '@angular/core';
import { RickAndMortyService } from '../services/api.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-search-episode',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    DashboardComponent
  ],
  templateUrl: './search-episode.component.html',
  styleUrl: './search-episode.component.css'
})
export class SearchEpisodeComponent {
  searchId!: number;
  searchedEpisode: any = null;
  errorMessage: string = '';

  constructor(private rickAndMortyService: RickAndMortyService) { }

  searchEpisode() {
    this.errorMessage = '';
    this.searchedEpisode = null;

    this.rickAndMortyService.getEpisodeById(this.searchId).subscribe(
      (response) => {
        if (response) {
          this.searchedEpisode = response; 
        } else {
          this.errorMessage = 'Episode Not Found';
        }
      },
      (error) => {
        this.errorMessage = 'Episode Not Found';
        this.searchedEpisode = null;
      }
    );
  }   

  closePopup(): void {
    this.searchedEpisode = null;
    this.searchId;
  }
}
