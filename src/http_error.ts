import { Status } from '../deps.ts'

export class HttpError extends Error {
  status: Status
    
  constructor (status: Status, message: string) {
    super(message)
    this.status = status
  }
}
  