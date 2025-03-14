import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { PokemonPictureComponent } from '../../components/pokemon-picture/pokemon-picture.component';
import { PokemonCardComponent } from '../../components/pokemon-card/pokemon-card.component';
import { PokemonService } from '../../services/pokemon.service';
import { Resultant } from '../../interfaces/pokeapi';
import { CommonModule } from '@angular/common';
import { Pokemon } from '../../interfaces/pokemon';
import { DetailsComponent } from '../../components/details/details.component';

@Component({
  selector: 'app-home',
  imports: [
    PokemonPictureComponent,
    PokemonCardComponent,
    CommonModule,
    DetailsComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  constructor(private pokemonService: PokemonService) {}
  @ViewChild('cards') cardsElement!: ElementRef;

  pokemonList: Resultant[] = [];

  page: number = 1;
  loading: boolean = false;
  selectedPokemon?: Pokemon;
  details: boolean = false;

  ngOnInit(): void {
    this.loadList();
    this.pokemonService.getById('1');
  }

  async loadList() {
    this.loading = true;
    this.pokemonList = [
      ...this.pokemonList,
      ...(await this.pokemonService.getByPage(this.page)),
    ];
    this.loading = false;
    this.page++;
  }

  onScroll(e: any) {
    if (this.loading) return;
    if (
      Math.round(
        this.cardsElement.nativeElement.clientHeight +
          this.cardsElement.nativeElement.scrollTop
      ) === e.srcElement.scrollHeight
    ) {
      this.loadList();
    }
  }

  async clickedCard(id: string) {
    if (this.selectedPokemon && id === this.selectedPokemon?.id.toString()) {
      return this.changeStatusDetails();
    }
      this.selectedPokemon = await this.pokemonService.getById(id);
  }

  changeStatusDetails() {
    if (this.selectedPokemon) this.details = !this.details;
  }
}
