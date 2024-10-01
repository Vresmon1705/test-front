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
  characters: any[] = [];
  selectedCharacter: any = null;

  constructor(private rickAndMortyService: RickAndMortyService) { }

  searchEpisode() {
    this.errorMessage = '';
    this.searchedEpisode = null;
    this.characters = [];

    this.rickAndMortyService.getEpisodeById(this.searchId).subscribe(
      (response) => {
        if (response) {
          this.searchedEpisode = response;
          this.loadCharacters();
        }
      },
      (error) => {
        this.errorMessage = 'Episode Not Found';
        this.searchedEpisode = null;
      }
    );
  }

  loadCharacters() {
    if (this.searchedEpisode && this.searchedEpisode.characters) {
      this.searchedEpisode.characters.forEach((characterUrl: string) => {
        this.rickAndMortyService.getCharacterByUrl(characterUrl).subscribe(
          (character) => {
            this.characters.push(character);
          },
          (error) => {
            console.log('Error loading character', error);
          }
        );
      });
    }
  }

  showCharacterDetails(character: any): void {
    this.selectedCharacter = character;
  }

  closePopupEpisode(): void {
    this.searchedEpisode = null;
    this.searchId;
  }

  closePopupCharacter(): void {
    this.selectedCharacter = null;
  }
}
