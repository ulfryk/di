# di
Simple DI library

## How to ?

1. Annotate classes (so metadata is gathered) and bind:

```typescript
@Injectable()
class Engine {}

@Injectable()
class Car {
  constructor(
    engine: Engine
  ) {}
}

bind(Engine).toSelf()
bind(Car).toSelf()
```

To bind to implementation:

```typescript
@Injectable()
class Porshe extends Car {}

bind(Car).to(Porshe);
```

2. Bind to self with annotation:

```typescript
@BindInjectable()
class Engine {}

@BindInjectable()
class Car {
  constructor(
    engine: Engine
  ) {}
}
```

3. Provide non-class values to injector:

```typescript
bind(new Definition(
  [Panamera, Mustang],
  (panamera: Panamera, mustang: Mustang) => [ panamera, mustang ],
  'my-cars', // Better use Symbol then String
))
```

4. Get non class value:
```typescript
@BindInjectable()
class Garage {
  constructor(
    @Inject('my-cars') cars: Array<Car>
  ) {}
}
```

5. Get any value on demand:
```typescript
import { injector } from '@samwise-tech/di/src/injector-instance';

const garage = injector.get(Garage);
const cars = injector.get<Car[]>('my-cars');
const car = injector.get(Car);
```

## Decorators

- `@BindInjectable()`
- `@Injectable()`
- `@Inject(token)`
- `@InjectProp(token?)`

## Binding

### Class

- `bind(Car).toSelf()`
- `bind(Car).to(Mustang)`
- `bind(Car).toInstance(matiz)`

### Token

- `bind('car').toClass(Car)`
- `bind('car').toValue(matiz)`
- `bind('car').toFactory(engine => new Matiz(engine), PoorEngine)`

### `bind` definition token to the definition

- `bind(new Definition([PoorEngine], engine => new Matiz(engine), 'car'))`

## Injector

- `injector.register(new Definition(…))`
- `injector.registerClass(Car, Engine, Wheels, Seats, …)`
- `injector.registerBoundClass(Car, Mustang)(Engine, Wheels, Seats, …)`
- `injector.registerFactory('car', engine => new Matiz(engine), PoorEngine)`
- `injector.registerValue('fancy-car', new Polonez())`
- `injector.get(Car) // => instance of Car`
- `injector.has(Car) // => Boolean`

Injector singleton instance contains itself so it can be injected.
