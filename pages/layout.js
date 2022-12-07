import Link from "next/link";
import Head from "next/head";
import styles from "../styles/Layout.module.css";
export default function Layout({ children }) {
  return (
    <div>
      <Head>
        <title>Pueba Tecnica</title>
        <meta
          name="description"
          content="Pueba técnica realizada por Andrés Felipe Romero Hernandez para Datasketch"
        />
      </Head>
      <nav className={styles.navbar}>
        <Link href="/">
          <li className={styles.list}>🏠Home</li>
        </Link>
      </nav>
      <main>{children}</main>
    </div>
  );
}
