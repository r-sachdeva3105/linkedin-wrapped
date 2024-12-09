import Image from "next/image";

export default function Header() {
  const currentYear = 2024;

  return (
    <div className="flex items-center justify-center space-x-2 mb-6">
      <Image
        src="/linkedin-logo.png"
        alt="LinkedIn Logo"
        width={130}
        height={40}
      />
      <h1 className="text-3xl font-bold">Wrapped {currentYear}</h1>
    </div>
  );
}
