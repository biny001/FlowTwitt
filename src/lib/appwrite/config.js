import { Client, Databases, Account } from "appwrite";

const client = new Client();

client
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject("65d4d952295673ae8d0b");

export const account = new Account(client);
export const database = new Databases(client);
export const storage = new Storage(client);
