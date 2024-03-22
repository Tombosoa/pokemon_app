import { fetchPokemonList } from '@/lib/api';
import Link from 'next/link';
import React from 'react';

type Pokemon = {
  name: string;
  url: string;
  imageUrl: string;
};

export default async function PokemonGrid() {
  const pokemonList: Pokemon[] = await fetchPokemonList(1);

  return (
    <div >
      <div >
        <div >
        </div>
      </div>
      <div className="pokemon-grid">
        {pokemonList.map((pokemon: Pokemon) => {
          const pokemonId: string = pokemon.url.split('/')[6];
          const paddedPokemonId: string = pokemonId.padStart(3, '0');

          return (
            <Link href={`/server/${pokemonId}`} key={pokemonId}>
              <div  className='imgCont'>
                <div>
                 <img className='img' src={pokemon.imageUrl}></img>
                </div>
                <h3 >
                  {pokemon.name}
                </h3>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
