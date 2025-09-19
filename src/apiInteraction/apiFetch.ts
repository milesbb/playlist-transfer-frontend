import { toast } from "react-hot-toast";

const API_URL = import.meta.env.API_URL;

export function createApiFetch(
  accessToken: string | null,
  setAccessToken: (token: string | null) => void
) {
  return async function apiFetch(
    input: RequestInfo,
    init?: RequestInit
  ): Promise<Response> {
    let res = await fetch(input, {
      ...init,
      headers: {
        ...(init?.headers || {}),
        Authorization: accessToken ? `Bearer ${accessToken}` : "",
      },
      credentials: "include",
    });

    if (res.status === 401) {
      // Attempt refresh
      const refreshRes = await fetch(`${API_URL}/v1/users/refresh`, {
        method: "POST",
        credentials: "include",
      });

      if (refreshRes.ok) {
        const data: { accessToken: string } = await refreshRes.json();
        setAccessToken(data.accessToken);

        // Retry original request
        res = await fetch(input, {
          ...init,
          headers: {
            ...(init?.headers || {}),
            Authorization: `Bearer ${data.accessToken}`,
          },
          credentials: "include",
        });
      } else {
        toast.error("Session expired. Please log in again.");
        throw new Error("Session expired");
      }
    }

    if (!res.ok) {
      const text = await res.text();
      toast.error(text || "Something went wrong");
    }

    return res;
  };
}
