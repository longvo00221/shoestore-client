import { useRouter } from "next/navigation";
import React from "react";
import { IoMdHeartEmpty } from "react-icons/io";
type SideFavoriteProps = {};

const SideFavorite: React.FC<SideFavoriteProps> = () => {
  const favoriteItems = typeof window !== 'undefined'
  ? JSON.parse(localStorage.getItem('favoriteItems') || '[]')
  : [];
  
    const router = useRouter()
  return (
    <div  onClick={()=> router.push("/favorite-list")} className="w-10 min-w-0 md:w-12  md:max-w-[48px] text-black h-10 md:h-12 rounded-full flex justify-center hover:bg-black/[0.05] cursor-pointer relative items-center">
      <IoMdHeartEmpty className="text-[19px] md:text-[20px]" />
      {favoriteItems.length !== 0 && (
        <div className="h-[14px] md:h-[18px] min-w-[14px] md:mix-w-[18px] rounded-full bg-red-600 absolute md:top-2 top-[5px] left-5 md:left-7 text-white text-[10px] md:text-[12px] flex justify-center items-center px-[2px] md:px-[5px] ">
          {favoriteItems.length}
        </div>
      )}
    </div>
  );
};
export default SideFavorite;
