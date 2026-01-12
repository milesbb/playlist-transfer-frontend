import React from "react";
import { toast } from "react-hot-toast";
import { NavigateFunction } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL;

const refreshAccessToken = async (): Promise<string | null> => {
  try {
    const res = await fetch(`${API_URL}/v1/users/refresh`, {
      method: "POST",
      credentials: "include",
    });

    if (!res.ok) return null;

    const data: { accessToken: string } = await res.json();
    sessionStorage.setItem("accessToken", data.accessToken);

    return data.accessToken;
  } catch {
    return null;
  }
};

export const checkAndRefreshTokenOnLanding = async (
  setAccessToken: (token: string) => void,
  navigate: NavigateFunction,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
) => {
  setLoading(true);
  const token = await refreshAccessToken();
  if (token) {
    setAccessToken(token);
    navigate("/dashboard");
  }
};

export function createApiFetch(
  accessToken: string | null,
  setAccessToken: (token: string | null) => void,
  navigate: (path: string) => void
) {
  return async function apiFetch(
    input: RequestInfo,
    init?: RequestInit
  ): Promise<Response> {
    let token = accessToken;
    let res = await fetch(input, {
      ...init,
      headers: {
        ...(init?.headers || {}),
        Authorization: token ? `Bearer ${token}` : "",
      },
      credentials: "include",
    });

    if (res.status === 401) {
      const body = await res.json();
      console.log(body);
      if (body.errorKey == "Unauthorized") {
        const newAccessToken = await refreshAccessToken();

        if (newAccessToken) {
          setAccessToken(newAccessToken);
          token = newAccessToken;

          res = await fetch(input, {
            ...init,
            headers: {
              ...(init?.headers || {}),
              Authorization: `Bearer ${token}`,
            },
            credentials: "include",
          });
        } else {
          toast.error("Session expired. Redirecting to login...");
          setAccessToken(null);
          navigate("/login");
          throw new Error("Session expired");
        }
      }
    }
    if (!res.ok) {
      const text = await res.text();
      toast.error(text || "Something went wrong");
    }

    return res;
  };
}
