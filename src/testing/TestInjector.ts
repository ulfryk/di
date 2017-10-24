import { CircularDependencyError, RegistrationError } from '../errors';
import { Definition, FactoryFn, Injector, Label, Token, Type } from '../injector';

export default class TestInjector extends Injector {

  constructor(
    protected name: string,
    private source: Injector,
  ) {
    super();
  }

  public register(definition: Definition): void {
    this.factories.set(definition.token, definition);
  }

  public registerClass<T>(token: Type<T>, ...dependencies: Token[]): void {
    this.factories.set(token, {
      dependencies,
      factory: (...args: any[]) => new token(...args),
      token,
    });
  }

  public registerBoundClass<T extends object, C extends T>(token: Token<T>, Class: Type<C>) {
    return (...dependencies: Token[]): void => {
      this.factories.set(token, {
        dependencies,
        factory: (...args: any[]) => new Class(...args),
        token,
      });
    };
  }

  public registerFactory<T>(token: Label, factory: FactoryFn<T>, ...dependencies: Token[]): void {
    this.factories.set(token, { dependencies, factory, token });
  }

  public registerValue(token: Token, value: any): void {
    this.factories.set(token, { dependencies: [], factory: () => value, token });
  }

  public get<T>(type: Token<T>, chain: Token[] = [type]): T {
    if (chain.filter(dep => dep === type).length > 1) {
      throw CircularDependencyError.of(chain.map(dep => `${this.getName(dep)}`));
    }
    if (this.hasInstance(type)) {
      return this.getInstance(type);
    }
    if (this.hasFactory(type)) {
      return this.produce(type, chain, this.get.bind(this));
    }
    throw RegistrationError.notRegistered(
      this.getName(type),
      chain.map(dep => `${this.getName(dep)}`));
  }

  public getClean<T>(type: Token<T>, chain: Token[] = [type]): T {
    if (chain.filter(dep => dep === type).length > 1) {
      throw CircularDependencyError.of(chain.map(dep => `${this.getName(dep)}`));
    }
    if (this.hasFactory(type)) {
      return this.produce(type, chain, this.getClean.bind(this));
    }
    throw RegistrationError.notRegistered(
      this.getName(type),
      chain.map(dep => `${this.getName(dep)}`));
  }

  private hasInstance(token: Token): boolean {
    return this.instances.has(token) || this.source.instances.has(token);
  }

  private hasFactory(token: Token): boolean {
    return this.factories.has(token) || this.source.factories.has(token);
  }

  private getInstance<T>(type: Token<T>): T {
    return this.instances.has(type) ? this.instances.get(type) : this.source.instances.get(type);
  }

  private getFactory<T>(type: Token<T>): Definition<T> {
    return this.factories.has(type) ?
      this.factories.get(type) as Definition<T> :
      this.source.factories.get(type) as Definition<T>; // Guarded
  }

  private produce<T>(
    type: Token<T>,
    chain: Token[],
    getter: (type: Token<T>, chain?: Token[]) => T,
  ): T {
    const { dependencies, factory, token } = this.getFactory(type);
    const value: T = factory(...dependencies.map(dep => getter(dep, chain.concat(dep))));
    this.instances.set(token, value);
    return value;
  }

}
