/** A pseudo StyleDeclaration. */
export class StyleDeclaration {
  private _properties: Record<string, string> = {}

  get cssText (): string {
    return Object.keys(this._properties)
      .sort((x, y) => x.localeCompare(y))
      .map(x => `${x}: ${this._properties[x]};`)
      .join(' ')
  }

  get length (): number {
    return Object.keys(this._properties).length
  }

  public getPropertyValue(name: string): string|undefined {
    return this._properties[name]
  }

  public removeProperty (name: string): void {
    delete this._properties[name]
  }

  public setProperty (name: string, value: string): void {
    this._properties[name] = value
  }
}
