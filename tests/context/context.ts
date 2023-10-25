export function createContext<IPages>(obj: Partial<IPages> = {}): IPages {
    return new Proxy(obj, {
      get: (target, prop) => {
        if (!Reflect.has(target, prop) || Reflect.get(target, prop) === undefined) {
          throw new Error(`${String(prop)} is not defined`);
        }
  
        return Reflect.get(target, prop);
      },
    }) as IPages;
  }
  