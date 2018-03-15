export default interface Type<T = any> { // tslint:disable-line:interface-name
  readonly name: string;
  readonly prototype: T;
  new(...dependencies: any[]): T; // tslint:disable-line:readonly-interface
}
