export class RegistrationError extends Error {

  public static of(desc: string, type = 'It') {
    return new RegistrationError(`Cannot register ${desc}. ${type} is already registered.`);
  }

  public static notRegistered(name: string, path: string[]) {
    return new RegistrationError(`${name} not registered ( path: ${path.join(' <- ')} ).`);
  }

}
