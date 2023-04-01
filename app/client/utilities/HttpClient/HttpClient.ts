class HttpClient {
  protected getBaseUrl(): string {
    return '/api';
  }

  protected getOptions(): RequestInit {
    return {
      credentials: 'include',
    };
  }

  protected async fetch(input: RequestInfo | URL, init?: RequestInit) {
    const rawResponse = await fetch(input, init);

    return rawResponse.json();
  }

  protected async get(url: string, params?: any, signal?: AbortSignal) {
    return this.fetch(`${this.getBaseUrl()}${url}?${new URLSearchParams(params)}`, {
      ...this.getOptions(),
      method: 'GET',
      headers: {
        Accept: 'application/json',
      },
      signal,
    });
  }

  protected async post(url: string, data?: any, signal?: AbortSignal) {
    return this.fetch(this.getBaseUrl() + url, {
      ...this.getOptions(),
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
      signal,
    });
  }
}

export default HttpClient;
