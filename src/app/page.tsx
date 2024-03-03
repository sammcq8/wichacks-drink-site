import Image from "next/image";
import styles from "./page.module.css";
import { cookies } from "next/headers";
import Link from "next/link";
import '../../bootstrap.min.css';


export default function Home() {

  const coffeeAttributes = cookies().get("coffeeAttributes")
  const teaAttributes = cookies().get("teaAttributes")
  const name = cookies().get("name")

  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <h1 > Welcome to SipSage {name?.value}! </h1>
      </div>

      <div className={styles.grid}>
        <div className={styles.card}>
          <h2>Coffee</h2>
          <p>
            {coffeeAttributes?.value == null ? "You haven't taken the Coffee Quiz yet, would you like to?" : 
              coffeeAttributes.value.split("[")[1].split("]")[0].replaceAll("\"", "").replaceAll(",", ", ")
            }
          </p>
          <br/>
          <Link href="/coffeequiz">Take the Coffee Quiz{coffeeAttributes?.value == null ? "!" : " Again!"}</Link>
        </div>
        <div className={styles.card}>
          <h2>Tea</h2>
          <p>
            {teaAttributes?.value == null ? "You haven't taken the Coffee Quiz yet, would you like to?" :
              teaAttributes.value.split("[")[1].split("]")[0].replaceAll("\"", "").replaceAll(",", ", ")
            }
          </p>
          <br />
          <Link href="/teaquiz">Take the Tea Quiz{teaAttributes?.value == null ? "!" : " Again!"}</Link>
        </div>

      </div>
      
    </main>
  );
}