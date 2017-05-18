import { FactoryFn, Injector, Label, Token, Type } from '../injector';

import extractDependenciesMetadata from './extractDependenciesMetadata';

export default class TokenBinder<T> {

  constructor(
    private readonly token: Label,
    private readonly getInjector: () => Injector,
  ) {}

  public toClass(constructor: Type<T>) {
    this.getInjector()
      .registerBoundClass(this.token, constructor)(...extractDependenciesMetadata(constructor));
  }

  public toValue(value: T) {
    this.getInjector().registerValue(this.token, value);
  }

  public toFactory(factory: FactoryFn<T>, ...dependencies: Token[]) {
    this.getInjector().registerFactory(this.token, factory, ...dependencies);
  }

}
