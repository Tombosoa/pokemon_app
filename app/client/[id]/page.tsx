"use client"
import { useRouter } from 'next/router';
import PokemonDetails from '../../../components/PokemonDetails';
import { usePathname } from 'next/navigation';


const PokemonDetailPage: React.FC = () => {
    const pathname = usePathname();
    const id = pathname ? pathname.split("/").pop() : null;

 const numericId = Number(id);

 if (isNaN(numericId)) {
   return <div>ID non valide</div>;
 }

 return <PokemonDetails id={numericId} />;
};

export default PokemonDetailPage;
