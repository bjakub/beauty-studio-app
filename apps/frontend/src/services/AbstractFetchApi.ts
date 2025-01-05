export abstract class AbstractFetchApi {
  protected static async detectResponse<T>(url: string, options?: RequestInit): Promise<T> {
    const response = await fetch(url, options);

    if (!response.ok) {
      throw new FetchError(response.statusText);
    }

    return response.json();
  }
}

export class FetchError extends Error {
  constructor(message: string) {
    super(message);
  }
}
