import { Component, OnInit } from '@angular/core';
import { RickAndMortyService } from '../services/api.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SearchCharacterComponent } from '../search-character/search-character.component';
import { SearchEpisodeComponent } from '../search-episode/search-episode.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    SearchCharacterComponent,
    SearchEpisodeComponent
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})

export class DashboardComponent implements OnInit {
  characters: any[] = [];
  currentPage: number = 1;
  totalPages: number = 0;
  selectedCharacter: any = null;

  constructor(
    private rickAndMortyService: RickAndMortyService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadCharacters(this.currentPage);
  }

  loadCharacters(_page: number): void {
    this.rickAndMortyService.getCharacters(this.currentPage).subscribe((data) => {
      this.characters = data.results.slice(0, 10);;
      this.totalPages = Math.ceil(data.info.count / 10);
    });
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.loadCharacters(this.currentPage);
    }
  }

  prevPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.loadCharacters(this.currentPage);
    }
  }

  showCharacterDetails(character: any): void {
    this.selectedCharacter = character;
  }

  closePopup(): void {
    this.selectedCharacter = null;
  }

  logout() {
    this.router.navigate(['/login']);
    console.log("Sesión cerrada");
  }

}
