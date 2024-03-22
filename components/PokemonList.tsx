import React, { useState, useEffect } from 'react';

interface Pokemon {
 id: number;
 name: string;
 url: string;
 image: string;
}

const PokemonList: React.FC= () => {
 const [pokemons, setPokemons] = useState<Pokemon[]>([]);
 const [currentPage, setCurrentPage] = useState(1);
 const [totalPages, setTotalPages] = useState(0);

 const fetchPokemons = async () => {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=50&offset=${(currentPage - 1) * 50}`);
    const data = await response.json();
    const pokemonDetails = await Promise.all(data.results.map(async (pokemon: { url: string | URL | Request; }) => {
      const detailResponse = await fetch(pokemon.url);
      const detailData = await detailResponse.json();
      return {
        id: detailData.id,
        name: detailData.name,
        url: pokemon.url,
        image: detailData.sprites.front_default,
      };
    }));
    setPokemons(pokemonDetails);
    setTotalPages(Math.ceil(data.count / 50));
 };

    useEffect(() => {
      fetchPokemons();
    }, [currentPage]);

 return (
    <div>
 <ul className="pokemon-grid">
    {pokemons.map((pokemon, index) => (
      <li key={index}>
        <img src={pokemon.image} alt={pokemon.name} /> 
        <p>{pokemon.name}</p>
        <button onClick={() => window.location.href = `/client/${pokemon.id}`}>Details</button>
      </li>
    ))}
 </ul>
 <div>
    <button disabled={currentPage === 1} onClick={() => setCurrentPage(currentPage - 1)}>previous </button>
    <span> page {currentPage} on {totalPages} </span>
    <button disabled={currentPage === totalPages} onClick={() => setCurrentPage(currentPage + 1)}>next</button>
 </div>
</div>

 );
};

export default PokemonList;
