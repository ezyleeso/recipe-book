import axios from "@/lib/axios";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function AxiosInterceptor({ children }) {
  const router = useRouter();

  useEffect(() => {
    axios.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response.status === 404) {
          return router.push("/404");
        }

        console.error(error);
      }
    );
  }, [router]);

  return <div>{children}</div>;
}
