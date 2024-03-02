import Image from "next/image";
import styles from "./page.module.css";
import { cookies } from "next/headers";
import Link from "next/link";

export default function Home() {

  const coffeeAttributes = cookies().get("coffeeAttributes")
  const teaAttributes = cookies().get("teaAttributes")
  const name = cookies().get("name")

  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <h1> Welcome to our app {name?.value}! </h1>
      </div>
      <div className={styles.card}>
        <h2>Coffee</h2>
        <p>
          {coffeeAttributes?.value == null ? "You haven't taken the Coffee Quiz yet, would you like to?" : coffeeAttributes?.value}
        </p>
        <Link href="/coffeequiz">Take the Coffee Quiz{coffeeAttributes?.value == null ?"!":" Again!"}</Link>
      </div>
      <div className={styles.card}>
        <h2>Tea</h2>
        <p>
          {teaAttributes?.value == null ? "You haven't taken the Tea Quiz yet, would you like to?" : teaAttributes?.value}
          <Link href="/coffeequiz">Take the Tea Quiz{teaAttributes?.value == null ? "!" : " Again!"}</Link>

        </p>
      </div>
    </main>
  );
}