const BE_URL = import.meta.env.VITE_API_URL;

type RequestMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

function request<T>(
  url: string,
  method: RequestMethod = 'GET',
  data: any = null,
  credentials: string = 'include',
): Promise<T> {
  const options: RequestInit = { method };

  if (data) {
    options.headers = {
      'Content-Type': 'application/json; charset=UTF-8',
    };

    options.body = JSON.stringify(data);
  }

  return fetch(BE_URL + url, options)
    .then((res) => {
      if (res.ok) {
        return res.json();
      }

      throw new Error(res);
    })
    .catch((err) => {
      throw new Error(err);
    });
}

export const client = {
  get: <T>(url: string) => request<T>(url),
  post: <T>(url: string, data: any) => request<T>(url, 'POST', data),
  put: <T>(url: string, data: any) => request<T>(url, 'PUT', data),
  patch: <T>(url: string, data: any) => request<T>(url, 'PATCH', data),
  delete: <T>(url: string) => request<T>(url, 'DELETE'),
};
