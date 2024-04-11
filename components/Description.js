import styles from "@/styles/Description.module.css";

export default function Description({ children }) {
  return <p className={styles.desc}>{children}</p>;
}
