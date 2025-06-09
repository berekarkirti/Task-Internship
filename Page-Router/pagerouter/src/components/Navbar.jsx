import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="bg-teal-500 p-4 text-white">
      <div className="container mx-auto flex justify-between">
        <h1 className="font-bold text-xl">My Site</h1>
        <div className="flex space-x-4">
          <Link href="/">Home</Link>
          <Link href="/about">About</Link>
          <Link href="/contact">Contact</Link>
          <Link href="/blog">Blog</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
