import Image from "next/image";
import styles from "./page.module.css";
import { cookies } from "next/headers";

export default function Home() {

  const coffeeAttributes = cookies().get("coffeeAttributes")
  const teaAttributes = cookies().get("teaAttributes")
  const name = cookies().get("name")

  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <h1> Welcome to our app {name?.value}! </h1>
        <p>
          {coffeeAttributes?.value === null ? "You haven't taken the Coffee Quiz yet, would you like to?" : coffeeAttributes?.value}
        </p>
      </div>
    </main>
  );
}