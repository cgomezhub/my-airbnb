'use client';

import Container from "../Container";

import { GiBarn, GiBoatFishing, GiCactus, GiCastle, GiCavalry, GiCaveEntrance, GiForestCamp, GiIsland, GiWindmill } from "react-icons/gi";
import { MdOutlineVilla } from "react-icons/md";
import { TbBeach, TbMountain, TbPool } from "react-icons/tb";
import CategoryBox from "../CategoryBox";
import { usePathname, useSearchParams } from "next/navigation";
import { FaSkiing } from "react-icons/fa";
import { BsSnow } from "react-icons/bs";
import { IoDiamond } from "react-icons/io5";

// Define an array of categories
export const categories = [
  {
    label: "Playa",
    icon: TbBeach,
    description: "Esta popiedad esta cerca de la playa",
  },
  {
    label: "Molinos",
    icon: GiWindmill,
    description: "Esta popiedad tiene Molinos",
  },
  {
    label: "Moderna",
    icon: MdOutlineVilla,
    description: "Esta popiedad es moderna",
  },
  {
    label: "Montaña",
    icon: TbMountain,
    description: "Esta popiedad esta en un lugar tranquilo",
  },
  {
    label: "Piscinas",
    icon: TbPool,
    description: "Esta popiedad tiene una piscina",
  },
  {
    label: "Islas",
    icon: GiIsland,
    description: "Esta popiedad esta en una isla",
  },
  {
    label: "Lago",
    icon: GiBoatFishing,
    description: "Esta popiedad esta cerca de un lago",
  },
  {
    label: "Esqui",
    icon: FaSkiing,
    description: "Esta popiedad tiene para esquiar",
  },
  {
    label: "Castillo",
    icon: GiCastle,
    description: "Esta popiedad esta en un castilllo",
  },
  {
    label: "Acampar",
    icon: GiForestCamp,
    description: "Esta popiedad se puede acampar",
  },
  {
    label: "Artico",
    icon: BsSnow,
    description: "Esta popiedad tiene nevadas cerca",
  },
  {
    label: "Cactus",
    icon: GiCactus,
    description: "Esta popiedad tiene cactus cercanos",  
  },
  {
    label: "Establo",
    icon: GiBarn,
    description: "Esta popiedad esta en un establo",  
  },
  {
    label: "Lujo",
    icon: IoDiamond,
    description: "Esta popiedad es de lujo",  
  },
];

const Categories = () => {
    const params = useSearchParams();

    const category = params?.get('category');

    console.log(category);

    const pathName  = usePathname();

    const isMainPage = pathName === '/';

    if (!isMainPage) {
        return null;
    }

  return (
    <div>
      <Container>
        <div
          className="
                    pt-4
                    flex
                    flex-row
                    items-center
                    justify-between
                    overflow-x-auto
                    "
        >
          {categories.map((item) => (
            <CategoryBox
              key={item.label}
              label={item.label}
              selected={category === item.label}
              icon={item.icon}
            />
          ))}
        </div>
      </Container>
    </div>
  );
};

export default Categories;
