import Image from "next/image";
import styles from "./page.module.css";
import { cookies } from "next/headers";
import Link from "next/link";
import '../../bootstrap.min.css';
import { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies";


export default function Home() {

  const coffeeAttributes = cookies().get("coffeeAttributes")
  const teaAttributes = cookies().get("teaAttributes")
  const name = cookies().get("name")

  const drinkPreferences =  (quizType:String, cookie:RequestCookie|undefined) => {
    return cookie?.value == null ? "You haven't taken the "+ quizType +" Quiz yet, would you like to?" :
    "You said you prefer: " + cookie.value.split("[")[1].split("]")[0].replaceAll("\"", "").replaceAll(",", ", ")
  }

  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <h1 > Welcome to SipSage {name?.value}! </h1>
      </div>

      <div className={styles.grid}>
        <div className={styles.card}>
          <h2>Coffee</h2>
          <p>
            {drinkPreferences("Coffee", coffeeAttributes)}
          </p>
          <br/>
          <Link href="/coffeequiz">Take the Coffee Quiz{coffeeAttributes?.value == null ? "!" : " Again!"}</Link>
        </div>
        <div className={styles.card}>
          <h2>Tea</h2>
          <p>
            {drinkPreferences("Tea", teaAttributes)}
          </p>
          <br />
          <Link href="/teaquiz">Take the Tea Quiz{teaAttributes?.value == null ? "!" : " Again!"}</Link>
        </div>

      </div>
      
    </main>
  );
}