export type DbConnection = {
  provider: "postgresql";
  status: "mock";
  connectedAt: string;
};

let cachedConnection: DbConnection | null = null;

export function getDbConnection(): DbConnection {
  if (!cachedConnection) {
    cachedConnection = {
      provider: "postgresql",
      status: "mock",
      connectedAt: new Date().toISOString(),
    };
  }

  return cachedConnection;
}
