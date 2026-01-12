import { useEffect } from "react";

export const checkIfBeta = (): boolean =>
  sessionStorage.getItem("beta") === "true";

function useBetaFlagFromQuery() {
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("beta") === "true") {
      sessionStorage.setItem("beta", "true");
    }
  }, []);
}

export default useBetaFlagFromQuery;
