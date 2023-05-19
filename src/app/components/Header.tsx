import Link from 'next/link';

function Header() {
  return (
    <header className="p-4 bg-blue-500 text-white">
      <nav>
        <ul className="flex justify-around">
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/upload">Upload</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
