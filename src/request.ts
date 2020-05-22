import { ServerRequest } from '../deps.ts'

export class Request {
  private serverRequest: ServerRequest
  method: HttpMethod
  path: string
  query?: string
  searchParams: URLSearchParams
  body: Body

  constructor (serverRequest: ServerRequest) {
    const [path, query] = serverRequest.url.split('?')
    this.serverRequest = serverRequest
    this.method = serverRequest.method as HttpMethod
    this.path = (path[0] === '/') ? path : `/${path}` // enforce leading slash
    if (this.path.length > 1 && this.path[this.path.length - 1] === '/') {
      this.path = this.path.slice(0, -1) // remove trailing slash
    }
    this.query = query
    this.searchParams = new URLSearchParams(query)
    this.body = { type: BodyType.None }
  }

  async postParams () {
    const decoder = new TextDecoder()
    const rawBody = await Deno.readAll(this.serverRequest.body)
    const bodyString = decoder.decode(rawBody)
    return new URLSearchParams(bodyString)
  }
}

export type HttpMethod =
  | 'DELETE'
  | 'GET'
  | 'HEAD'
  | 'OPTIONS'
  | 'PATCH'
  | 'POST'
  | 'PUT'

export enum BodyType {
  JSON = 'json',
  Form = 'form',
  Text = 'text',
  None = 'none'
}
  
export type Body =
  | { type: BodyType.JSON, value: any }
  | { type: BodyType.Form, value: URLSearchParams }
  | { type: BodyType.Text, value: string }
  | { type: BodyType.None }
