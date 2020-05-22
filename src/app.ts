import { serve, ServerRequest, Status } from '../deps.ts'
import { HttpError } from './http_error.ts'
import { Request } from './request.ts'
import { Response } from './response.ts'

export class App {
  routes: Routes = {}
  env: 'dev'|'prod' = 'prod'

  errorHandler: ErrorHandler = function (error: Error|HttpError): Response {
    const response = new Response()
    response.status = (error as HttpError).status || 500
    response.body = error.message
    return response
  }

  async listen (port: number) {
    const server = serve({ port })
    console.log(`Application is listening on port ${port}...`)
    for await (const serverRequest of server) {
      serverRequest.respond(await this.handle(serverRequest)).catch(() => {})
    }
  }

  async handle (serverRequest: ServerRequest): Promise<Response> {
    try {
      const request = new Request(serverRequest)
      const handler = this.find(request)
      if (handler === null) {
        const error = new HttpError(Status.NotFound, 'Page not found.')
        return this.errorHandler(error)
      }
      return await handler(request)
    } catch (error) {
      if (this.env === 'dev') {
        console.error(error)
      }
      if (error instanceof HttpError === false) {
        error.status = 500
      }
      return this.errorHandler(error)
    }
  }

  route (method: string, pattern: string, handler: Handler) {
    if (this.routes[method] === undefined) this.routes[method] = []
    this.routes[method].push({
      pattern: new RegExp(`^${pattern.replace(/\//g, '\/')}$`),
      handler: handler
    })
  }

  error (errorHandler: ErrorHandler) {
    this.errorHandler = errorHandler
  }

  find (request: Request): Handler|null {
    for (const route of this.routes[request.method]) {
      if (request.path.match(route.pattern)) {
        return route.handler
      }
    }

    return null
  }
}

export type Routes = Record<string, Route[]>

export type Route = { pattern: RegExp, handler: Handler }

export type Handler = (request: Request) => Response|Promise<Response>

export type ErrorHandler = (error: HttpError) => Response|Promise<Response>
