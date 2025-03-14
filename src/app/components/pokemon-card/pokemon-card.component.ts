import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { Resultant } from '../../interfaces/pokeapi';
import { CommonModule } from '@angular/common';
import { PokemonService } from '../../services/pokemon.service';
import { Pokemon } from '../../interfaces/pokemon';

@Component({
  selector: 'app-pokemon-card',
  imports: [CommonModule],
  templateUrl: './pokemon-card.component.html',
  styleUrl: './pokemon-card.component.scss'
})
export class PokemonCardComponent implements OnChanges {

  constructor(private pokemonService: PokemonService) {}

  ngOnChanges(): void {
    this.extractInfo();
  }



  @Input() data?:Resultant;
  @Input() selected:boolean = false;
  @Input() fullData?: Pokemon;
  @Output() clicked = new EventEmitter<string>();
  id:string = "0";

  extractInfo(){
    if(this.data && this.data.url !== "") {
      this.id = this.data.url.substring(34, this.data.url.length - 1);
      return;
    }
    if(this.fullData) {
      this.id = this.fullData.species.url.substring(42, this.fullData.species.url.length - 1);
      this.data = {
        name: this.fullData.species.name,
        url: ""
      }
    }
  }

}
