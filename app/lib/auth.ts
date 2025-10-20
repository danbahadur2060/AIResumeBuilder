import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";

let client: MongoClient | null = null;
let db: any = null;

async function getDatabase() {
  if (!client) {
    client = new MongoClient(process.env.MONGODB_URI!);
    await client.connect();
    db = client.db(process.env.MONGODB_DBNAME);
  }
  return { client, db };
}

// Create a function that returns the auth instance
function createAuth() {
  return betterAuth({
    database: mongodbAdapter(
      new Promise(async (resolve) => {
        const { db, client } = await getDatabase();
        resolve(mongodbAdapter(db, { client }));
      }) as any,
      { client: new Promise(async (resolve) => {
        const { client } = await getDatabase();
        resolve(client);
      }) as any }
    ),
    emailAndPassword: { enabled: true },
    socialProviders: {
      google: {
        clientId: process.env.GOOGLE_CLIENT_ID!,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      },
    },
  });
}

// Export a lazy-loaded auth instance
let authInstance: any = null;

export const auth = {
  get api() {
    if (!authInstance) {
      authInstance = createAuth();
    }
    return authInstance.api;
  },
  get handler() {
    if (!authInstance) {
      authInstance = createAuth();
    }
    return authInstance.handler;
  }
};
