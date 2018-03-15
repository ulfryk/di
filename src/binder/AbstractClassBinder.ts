import { FactoryFn, Token, Type } from '../injector';

export default interface IAbstractClassBinder<T extends object> {
  to(implementation: Type<T>): void;
  toInstance(value: T): void;
  toFactory(factory: FactoryFn<T>, ...dependencies: Token[]): void;
}
