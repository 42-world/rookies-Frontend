async function request<TResponse>(
  url: string,
  config: RequestInit = {}
): Promise<TResponse> {
  const res = await fetch(url, config);
  return await res.json();
}

export const api = {
  get: <TResponse>(url: string, config?: RequestInit) =>
    request<TResponse>(url, config),
  post: <TBody extends BodyInit, TResponse>(url: string, body: TBody) =>
    request<TResponse>(url, {
      method: "POST",
      body,
    }),
};