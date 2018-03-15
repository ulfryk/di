import { FactoryFn, Injector, Token, Type } from '../injector';
import { extractDependenciesMetadata } from '../metadata';

import IAbstractClassBinder from './AbstractClassBinder';

export default class ClassBinder<T extends object> implements IAbstractClassBinder<T> {

  constructor(
    private readonly type: Type<T>,
    private readonly getInjector: () => Injector,
  ) {}

  public toSelf() {
    this.getInjector().registerClass(this.type, ...extractDependenciesMetadata(this.type));
  }

  public to(implementation: Type<T>) {
    this.getInjector().registerBoundClass(this.type, implementation)(
      ...extractDependenciesMetadata(implementation));
  }

  public toInstance(value: T) {
    this.getInjector().registerValue(this.type, value);
  }

  public toFactory(factory: FactoryFn<T>, ...dependencies: Token[]) {
    this.getInjector().registerFactory(this.type, factory, ...dependencies);
  }

}
