/** A pseudo TokenList. */
export class TokenList {
  private _tokens: string[] = []

  get length (): number {
    return this._tokens.length
  }

  get value (): string {
    return this._tokens.join(' ')
  }

  public item (index: number): string|undefined {
    return this._tokens[index]
  }

  public contains (token: string): boolean {
    return this._tokens.includes(token)
  }

  public add (token: string): void {
    if (!this._tokens.includes(token)) {
      this._tokens.push(token)
    }
  }

  public remove (token: string): void {
    const index = this._tokens.indexOf(token)
    if (index > -1) {
      this._tokens.splice(index, 1)
    }
  }

  public replace (token1: string, token2: string): void {
    const index = this._tokens.indexOf(token1)
    if (index > -1) {
      this._tokens[index] = token2
    }
  }

  public toggle (token: string): void {
    if (this._tokens.includes(token)) {
      this.remove(token)
    } else {
      this.add(token)
    }
  }
}
