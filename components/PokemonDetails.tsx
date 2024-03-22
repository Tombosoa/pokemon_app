import React, { useState, useEffect } from 'react';

interface PokemonDetailsProps {
 id: number;
}

const PokemonDetails: React.FC<PokemonDetailsProps> = ({ id }) => {
 const [pokemon, setPokemon] = useState<any>(null);

 useEffect(() => {
    const fetchPokemon = async () => {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
      const data = await response.json();
      setPokemon(data);
    };

    fetchPokemon();
 }, [id]);

 if (!pokemon) return <div>Loading...</div>;

 return (
    <div>
      <img src={pokemon.sprites.front_default} alt={pokemon.name} />
      <h2>{pokemon.name}</h2>
      <p>Height: {pokemon.height}</p>
      <p>Weight: {pokemon.weight}</p>
      <p>Types: {pokemon.types.map((type: { type: { name: any; }; }) => type.type.name).join(', ')}</p>
      <p>Order: {pokemon.order}</p>
    </div>
 );
};

export default PokemonDetails;
