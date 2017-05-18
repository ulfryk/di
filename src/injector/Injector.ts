import { CircularDependencyError, RegistrationError } from '../errors';

import Definition from './Definition';
import FactoryFn from './FactoryFn';
import Label from './Label';
import Token from './Token';
import Type from './Type';

class Injector {

  protected name = 'Injector';

  constructor(
    public factories = new Map<Token, Definition>(),
    public instances = new Map<Token, any>(),
  ) {}

  public register(definition: Definition): void {
    if (this.factories.has(definition.token)) {
      throw RegistrationError.of(this.getName(definition.token));
    }
    this.factories.set(definition.token, definition);
  }

  public registerClass<T>(token: Type<T>, ...dependencies: Token[]): void {
    if (this.factories.has(token)) {
      throw RegistrationError.of(this.getName(token), 'Class');
    }
    this.factories.set(token, {
      dependencies,
      factory: (...args: any[]) => new token(...args),
      token,
    });
  }

  public registerBoundClass<T, C extends T>(token: Type<T>, Class: Type<C>) {
    return (...dependencies: Token[]): void => {
      if (this.factories.has(token)) {
        throw RegistrationError.of(
          `${this.getName(Class)} as ${this.getName(token)}`, `Class ${this.getName(token)}`);
      }
      this.factories.set(token, {
        dependencies,
        factory: (...args: any[]) => new Class(...args),
        token,
      });
    };
  }

  public registerFactory<T>(token: Label, factory: FactoryFn<T>, ...dependencies: Token[]): void {
    if (this.factories.has(token)) {
      throw RegistrationError.of(this.getName(token), 'Factory');
    }
    this.factories.set(token, { dependencies, factory, token });
  }

  public registerValue(token: Token, value: any): void {
    if (this.factories.has(token)) {
      throw RegistrationError.of(this.getName(token), 'Value');
    }
    this.factories.set(token, { dependencies: [], factory: () => value, token });
  }

  public get<T>(type: Token<T>): T {
    return this.getWithCheck(type);
  }

  public has<T>(type: Token<T>): boolean {
    return this.instances.has(type) || this.factories.has(type);
  }

  protected getName(type: Token): string {
    return `"${typeof type === 'function' ? type.name : String(type)}"`;
  }

  private getWithCheck<T>(type: Token<T>, chain: Token[] = [type]): T {
    if (chain.filter(dep => dep === type).length > 1) {
      throw CircularDependencyError.of(chain.map(dep => `${this.getName(dep)}`));
    }
    if (this.instances.has(type)) {
      return this.instances.get(type);
    }
    if (this.factories.has(type)) {
      return this.produceInstance(type, chain);
    }
    throw RegistrationError.notRegistered(
      this.getName(type),
      chain.map(dep => `${this.getName(dep)}`));
  }

  private produceInstance<T>(type: Token<T>, chain: Token[]) {
    const { dependencies, factory, token } = this.factories.get(type) as Definition<T>;
    const value: T = factory(...dependencies.map(dep => this.getWithCheck(dep, chain.concat(dep))));
    this.instances.set(token, value);
    return value;
  }

}

export default Injector;
