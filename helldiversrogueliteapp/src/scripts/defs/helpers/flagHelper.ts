export function hasAllFlags<Tflag extends number>(flags: Tflag, flag: Tflag): boolean {
    return (flags & flag) === flag;
  }

export function hasAnyFlag<Tflag extends number>(flags: Tflag, flag: Tflag): boolean {
    return (flags & flag) !== 0;
  }