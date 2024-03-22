const ITEMS_PER_PAGE: number = 50;


type Pokemon = {
  name: string;
  url: string;
  imageUrl: string;
 };
 
 export const fetchPokemonList = async (currentPage: number): Promise<Pokemon[]> => {
  const response: Response = await fetch(
     `https://pokeapi.co/api/v2/pokemon?limit=${ITEMS_PER_PAGE}&offset=${(currentPage - 1) * ITEMS_PER_PAGE}`
  );
  const data = await response.json();
 
  const detailedPokemonList = await Promise.all(data.results.map(async (pokemon: { url: string; name: any; imageUrl: any}) => {
    const pokemonId = pokemon.url.split('/').pop();
    const pokemonInfo = await fetchPokemonInfo(pokemonId); 
    const detailResponse = await fetch(pokemon.url);
    const detailData = await detailResponse.json();
    return {
      name: pokemon.name,
      url: pokemon.url,
      imageUrl: detailData.sprites.front_default
    };
}));

 
  return detailedPokemonList;
 };

export const fetchPokemonInfo = async (pokemonId: string | undefined) => {
  const response: Response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`);
  return await response.json();
};
