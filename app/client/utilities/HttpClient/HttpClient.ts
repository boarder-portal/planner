class HttpClient {
  protected getBaseUrl(): string {
    return '/api';
  }

  protected getOptions(): RequestInit {
    return {
      credentials: 'include',
    };
  }

  protected async get(url: string, params?: any, signal?: AbortSignal) {
    const rawResponse = await fetch(`${this.getBaseUrl()}${url}?${new URLSearchParams(params)}`, {
      ...this.getOptions(),
      method: 'GET',
      headers: {
        Accept: 'application/json',
      },
      signal,
    });

    return rawResponse.json();
  }

  protected async post(url: string, data?: any, signal?: AbortSignal) {
    const rawResponse = await fetch(this.getBaseUrl() + url, {
      ...this.getOptions(),
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
      signal,
    });

    return rawResponse.json();
  }
}

export default HttpClient;
