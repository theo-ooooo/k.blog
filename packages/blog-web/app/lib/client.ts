let _cookie = "";

export const setClientCookie = (cookie: string) => {
  _cookie = cookie;
};

export const fetchClient = {
  baseUrl:
    (typeof window === "undefined"
      ? process.env.API_BASE_URL
      : window.ENV?.API_BASE_URL) ?? "http://localhost:8080",
  async request<T>({
    url,
    method,
    headers,
    body,
  }: {
    url: string;
    method: string;
    headers?: { [key: string]: any };
    body?: { [key: string]: any };
  }) {
    const response = await fetch(this.baseUrl + url, {
      method,
      credentials: "include",
      headers: {
        Cookie: _cookie,
        ...headers,
        "Content-Type": "application/json",
      },
      body: body ? JSON.stringify(body) : undefined,
    });

    if (!response.ok) {
      const data = await response.json();

      throw new Error(data.error.message || "일시적인 오류가 발생하였습니다.");
    }
    const data: T = await response.json();
    return { data, headers: response.headers };
  },
};
