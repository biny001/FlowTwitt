import { ID, Query } from "appwrite";
import { account, databases, appwriteConfig, avatars } from "./config";

export async function createUserAccount(user) {
  try {
    const newAccount = await account.create(
      ID.unique(),
      user.email,
      user.password,
      user.name
    );

    if (!newAccount) throw Error;

    const avatarUrl = avatars.getInitials(user.name);

    const newUser = await saveUserToDB({
      accountId: newAccount.$id,
      name: newAccount.name,
      email: newAccount.email,
      username: user.username,
      imageUrl: avatarUrl,
    });

    if (!newUser) throw Error("error saving user to database");

    return newUser;
  } catch (err) {
    console.log("error creating user");
    return err;
  }
}

export async function signInAccount(user) {
  try {
    const session = await account.createEmailSession(
      user?.email,
      user?.password
    );

    return session;
  } catch (err) {
    console.log("cant sign in");
  }
}

export async function saveUserToDB(user) {
  try {
    const newUser = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      ID.unique(),
      user
    );

    return newUser;
  } catch (err) {
    console.log(err);
  }
}

export async function getAccount() {
  try {
    const currentAccount = await account.get();

    return currentAccount;
  } catch (err) {
    console.log(err);
  }
}

export async function getCurrentUser() {
  try {
    const currentAccount = await getAccount();

    if (!currentAccount) throw new Error("error getting currentAccount");

    const currentUser = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      [Query.equal("accountId", currentAccount.$id)]
    );

    if (!currentUser) throw new Error("error getting  current user");

    return currentUser.documents[0];
  } catch (err) {
    console.log(err);
    return null;
  }
}
