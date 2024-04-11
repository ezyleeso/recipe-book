import { useCallback, useEffect, useRef } from "react";
import styles from "@/styles/Cursor.module.css";

export default function Cursor() {
  const cursorRef = useRef(null);

  const handleMouseMove = useCallback((e) => {
    if (!cursorRef.current) return;

    const { clientX, clientY } = e;
    cursorRef.current.style.cssText = `left: ${clientX}px; top: ${clientY}px;`;
  }, []);

  const clearMouseMove = useCallback(() => {
    document.removeEventListener("mousemove", handleMouseMove);
  }, [handleMouseMove]);

  useEffect(() => {
    document.addEventListener("mousemove", handleMouseMove);

    return () => {
      clearMouseMove();
    };
  }, [handleMouseMove, clearMouseMove]);

  return (
    <div ref={cursorRef} className={styles["cursor"]}>
      <div className={styles["features"]}>
        <div className={styles["features-nose"]}></div>
      </div>
    </div>
  );
}
