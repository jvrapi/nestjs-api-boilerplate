interface ClassConstructor<T> {
  new (...args: any[]): T;
}

export function makeInjectable<T>(
  InjectableClass: ClassConstructor<T>,
  providersToken: any[] = [],
) {
  return {
    provide: InjectableClass,
    useFactory: (...providers: unknown[]) => new InjectableClass(...providers),
    inject: [...providersToken],
  };
}
