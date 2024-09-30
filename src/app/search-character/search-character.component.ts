import { Component, OnInit } from '@angular/core';
import { RickAndMortyService } from '../services/api.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-search-character',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
  ],
  templateUrl: './search-character.component.html',
  styleUrl: './search-character.component.css'
})
export class SearchCharacterComponent {
  searchTerm: string = '';
  searchedCharacter: any = null;
  errorMessage: string = '';

  constructor(private rickAndMortyService: RickAndMortyService) {}

  searchCharacter() {
    this.errorMessage = ''; 
    this.searchedCharacter = null; 

    this.rickAndMortyService.getCharacterByName(this.searchTerm).subscribe(
      (response) => {
        if (response.results.length > 0) {
          this.searchedCharacter = response.results[0];
        }
      },
      (error) => {
        this.errorMessage = 'Character Not Found';
        this.searchedCharacter = null; 
      }
    );
  }

  closePopup(): void {
    this.searchedCharacter = null;    
    this.searchTerm = '';
  }
}
