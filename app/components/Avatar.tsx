"use client";
import Image from "next/image";
import { FaUserCircle } from "react-icons/fa";

interface Props {
  src: string | null | undefined;  
}

const Avatar = ({ src }: Props) => {
  return (
    <>
      {src ? (
        <Image
          src={src}
          alt="avatar"
          width={32}
          height={32}
          className="rounded-full"
        />
      ) : (
        <FaUserCircle />
      )}
    </>
  );
};

export default Avatar;
