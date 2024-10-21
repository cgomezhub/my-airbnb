"use client";

import { IconType } from "react-icons";

interface Props {
  label: string;
  icon: IconType;
  selected?: boolean;
  onClick: (value: string) => void;
}

const CategoryInput = ({ icon: Icon, label, onClick, selected }: Props) => {
  return (
    <div
      onClick={() => onClick(label)}
      className={`
            flex
            flex-col
            rounded-xl
            border-2
            p-4
            gap-3
            hover:border-black
            transition
            cursor-pointer
            ${selected ? "border-black" : "border-neutral-200"}
        `}
    >

        <Icon size={30} className="text-4xl" />
        <span className="font-semibold">{label}</span>
    </div>
  );
};

export default CategoryInput;
