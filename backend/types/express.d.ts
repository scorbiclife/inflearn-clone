export type JwtPayload = {
  sub: string;
  email?: string;
  name?: string;
  iat?: number;
};

declare global {
  namespace Express {
    // This is needed for type checking to work
    // eslint-disable-next-line @typescript-eslint/no-empty-object-type
    interface User extends JwtPayload {}
  }
}
