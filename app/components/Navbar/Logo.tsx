"use client";
import Image from "next/image";
import Link from "next/link";

const Logo = () => {
  return (
    <Link href="/">
      <Image
        src="/images/logo.png"
        alt="Logo"
        className="hidden md:block"
        width={150}
        height={150}
      />
    </Link>
  );
};

export default Logo;
