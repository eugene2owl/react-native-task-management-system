export class BaseHttpService {

  private readonly HEADERS = {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  };

  get = (url: string) => fetch(url).then((response: Response)=> response.json());

  post = (url: string, body: object) => fetch(
    url,
    {
      method: 'POST',
      headers: this.HEADERS,
      body: JSON.stringify(body),
    }
  )
    .then(response => response.json());
}
