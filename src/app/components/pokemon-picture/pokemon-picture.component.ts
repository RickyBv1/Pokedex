import { Component, Input } from '@angular/core';
import { Pokemon } from '../../interfaces/pokemon';
import { CommonModule } from '@angular/common';
import { PokemonService } from '../../services/pokemon.service';

@Component({
  selector: 'app-pokemon-picture',
  imports: [CommonModule],
  templateUrl: './pokemon-picture.component.html',
  styleUrl: './pokemon-picture.component.scss',
})
export class PokemonPictureComponent {
  @Input() pokemon?: Pokemon;
}
