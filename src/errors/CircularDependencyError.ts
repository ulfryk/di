export class CircularDependencyError extends Error {

  public static of(path: string[]) {
    return new CircularDependencyError(`Circular dependency: ${path.join(' <- ')}.`);
  }

}
