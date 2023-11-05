class HttpService {
  private baseUrl: string = 'https://deezerdevs-deezer.p.rapidapi.com';

  private buildHeaders(): Headers {
    const headers = new Headers();

    headers.append(
      'X-RapidAPI-Key',
      '893a7a3cddmshcf2ad1c47947f59p130d4ajsn2f3d620124a1',
    );
    headers.append('X-RapidAPI-Host', 'deezerdevs-deezer.p.rapidapi.com');

    return headers;
  }

  private async doRequest<T>(method: string, path: string): Promise<T> {
    const response = await fetch(`${this.baseUrl}/${path}`, {
      method,
      headers: this.buildHeaders(),
    });

    if (response.ok) {
      try {
        const data = await response.json();

        return data;
      } catch {
        throw new Error(
          `Response status was not OK. Status: ${response.status}`,
        );
      }
    } else {
      throw new Error(`Response status was not OK. Status: ${response.status}`);
    }
  }

  public async get<T>(path: string): Promise<T> {
    return this.doRequest('GET', path);
  }
}

export default HttpService;
