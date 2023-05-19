import Link from 'next/link';

function Header() {
  return (
    <header className="w-full flex items-center justify-between p-5 bg-indigo-600">
      <div className="flex items-center">
        <div className="font-semibold text-lg text-white">🧠 no brainer</div>
      </div>
      <nav className="text-white text-lg">
        <ul className="flex items-center justify-between space-x-4">
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
