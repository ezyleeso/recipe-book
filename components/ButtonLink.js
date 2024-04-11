import Link from "next/link";
import styles from "@/styles/ButtonLink.module.css";

export default function Button({ children, ...rest }) {
  return (
    <Link {...rest} className={styles.button}>
      {children}
    </Link>
  );
}
