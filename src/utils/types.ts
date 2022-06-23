export interface MyContext {
  req: Express.Request & { session: { userId: number | null } };
}
