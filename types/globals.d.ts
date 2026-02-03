export {};

export type Roles = 'admin' | 'normal';

declare global {
  interface CustomJwtSessionClaims {
    metadata: {
      role?: Roles;
    };
  }
}
