import { Injector, Token, Type } from '../injector';
import { extractDependenciesMetadata } from '../metadata';

export default class ClassBinder<T extends object> {

  private readonly dependencies: Token[];

  constructor(
    private readonly type: Type<T>,
    private readonly getInjector: () => Injector,
  ) {
    this.dependencies = extractDependenciesMetadata(type);
  }

  public toSelf() {
    this.getInjector().registerClass(this.type, ...this.dependencies);
  }

  public to(implementation: Type<T>) {
    this.getInjector().registerBoundClass(this.type, implementation)(...this.dependencies);
  }

  public toInstance(value: T) {
    this.getInjector().registerValue(this.type, value);
  }

}
