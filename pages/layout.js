import Link from "next/link";

export default function Layout({ children }) {
  return (
    <div>
      <div>
        <li>
          <Link href="/">Home</Link>
        </li>
      </div>
      {children}
    </div>
  );
}
