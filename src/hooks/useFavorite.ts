import { User } from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useMemo } from "react";

interface UseFavorite {
    productId : string;
    currentUser?:User|null;
}

const useFavorite = ({ productId, currentUser }: UseFavorite) => {
    const router = useRouter();

    const hasFavorited = useMemo(() => {
        const list = currentUser?.favoriteIds || [];

        return list.includes(productId);
    }, [currentUser, productId]);

    const toggleFavorite = async(e:React.MouseEvent<HTMLDivElement>) => {
        e.stopPropagation();
        if(!currentUser){
            return;
        }

        try{
            
            let request;
            if(hasFavorited){

                request = () => axios.delete(`/api/favorites/${productId}`);
                console.log('있음')
            }else{
                request = () => axios.post(`/api/favorites/${productId}`);
                console.log('xx')
            }
            console.log('페이보릿',productId)

            await request();
            router.refresh();
            

        }catch(err){

        }
    }

    return {
        hasFavorited,
        toggleFavorite
    }
}

export default useFavorite