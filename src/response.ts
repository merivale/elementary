import { Status } from '../deps.ts'
import { Element } from './element.ts'

export class Response {
  status: Status
  headers: Headers
  body?: string

  constructor (status: Status = Status.OK, contentType: string = 'text/html', body?: string|Element) {
    this.status = status
    this.headers = new Headers()
    this.headers.set('content-type', contentType)
    if (body) {
      this.body = (typeof body === 'string') ? body : body.toString()
    }
  }
}

export class HtmlResponse extends Response {
  constructor (body?: string|Element) {
    super(Status.OK, 'text/html', body)
  }
}

export class JavascriptResponse extends Response {
  constructor (body: string) {
    super(Status.OK, 'text/javascript', body)
  }
}

export class JsonResponse extends Response {
  constructor (body: string|any) {
    body = (typeof body === 'string') ? body : JSON.stringify(body)
    super(Status.OK, 'application/json', body)
  }
}