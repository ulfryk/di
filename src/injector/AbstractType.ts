type AbstractType<T = any> = Function & {
  readonly prototype: T;
};

export default AbstractType;
