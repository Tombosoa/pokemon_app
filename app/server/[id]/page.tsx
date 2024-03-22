// pages/server/[id].tsx
import { usePathname } from 'next/navigation';
import React from 'react';
import { fetchPokemonInfo } from '@/lib/api'; 


export default function PokemonDetails({ pokemonInfo }) {
 if (!pokemonInfo) {
    return <div>Loading...</div>;
 }

 return (
    <div>
      <h1>{pokemonInfo.name}</h1>
      <img src={pokemonInfo.sprites.front_default} alt={pokemonInfo.name} />
      <h2>Abilities</h2>
      <ul>
        {pokemonInfo.abilities.map((ability: any, index: any) => (
          <li key={index}>{ability.ability.name}</li>
        ))}
      </ul>
      <h2>Types</h2>
      <ul>
        {pokemonInfo.types.map((type: any, index: any) => (
          <li key={index}>{type.type.name}</li>
        ))}
      </ul>
      
    </div>
 );
}

export async function getProps(context: { params: { id: any; }; }) {
 const { id } = context.params;
 const pokemonInfo = await fetchPokemonInfo(id);

 return {
    props: {
      pokemonInfo,
    },
 };
}
