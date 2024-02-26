import { ID, Query } from "appwrite";
import { account, databases, appwriteConfig, avatars, storage } from "./config";
import { data } from "autoprefixer";

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

export async function Signout() {
  try {
    const deletSession = await account.deleteSession("current");

    return deletSession;
  } catch (err) {
    console.log("error loggin out user");
  }
}

export async function createPost(post) {
  try {
    console.log(post.file[0]);
    const uploadedFile = await uploadFile(post.file[0]);
    if (!uploadedFile) throw Error("error uploading file");

    // console.log("uploadedFile", uploadedFile);
    const fileUrl = getFilePreview(uploadedFile.$id);
    if (!fileUrl) {
      await deleteFile(uploadedFile.$id);
      throw Error;
    }
    // console.log("fileUrl", fileUrl);

    const tags = post.tags?.replace(/ /g, "").split(",") || [];

    // console.log("tags", tags);

    const newPost = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.postCollectionId,
      ID.unique(),
      {
        creator: post.userId,
        caption: post.caption,
        imageUrl: fileUrl,
        Imageid: uploadedFile.$id,
        location: post.location,
        Tags: tags,
      }
    );

    if (!newPost) {
      await deleteFile(uploadedFile.$id);
      throw Error;
    }

    console.log(post?.userId);
    return newPost;
  } catch (err) {
    console.log(err);
  }
}

export async function uploadFile(file) {
  try {
    const uploadedFile = await storage.createFile(
      appwriteConfig.storageId,
      ID.unique(),
      file
    );

    return uploadedFile;
  } catch (error) {
    console.log(error);
  }
}
export function getFilePreview(fileId) {
  try {
    const fileUrl = storage.getFilePreview(
      appwriteConfig.storageId,
      fileId,
      2000,
      2000,
      "top",
      100
    );

    if (!fileUrl) throw Error;

    return fileUrl;
  } catch (error) {
    console.log(error);
  }
}

export async function deleteFile(fileId) {
  try {
    await storage.deleteFile(appwriteConfig.storageId, fileId);

    return { status: "ok" };
  } catch (error) {
    console.log(error);
  }
}

export async function getRecentPost() {
  try {
    const recentPosts = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.postCollectionId,
      [Query.orderDesc("$createdAt"), Query.limit(20)]
    );
    if (!recentPosts) throw Error;

    console.log(recentPosts);
    return recentPosts;
  } catch (err) {
    console.log(err);
  }
}

export async function likePost({ postId, likesArray }) {
  try {
    const updatedPost = await databases.updateDocument(
      appwriteConfig.databaseId,
      appwriteConfig.postCollectionId,
      postId,
      {
        likes: likesArray,
      }
    );

    if (!updatedPost) throw Error;

    return updatedPost;
  } catch (err) {
    console.log(err);
  }
}

export async function savePost(userId, postId) {
  try {
    console.log("This is me trying to debug my code", postId, userId);
    const savedPost = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.savesCollectionId,
      ID.unique(),
      {
        users: userId,
        posts: postId,
      }
    );

    console.log(savedPost);

    if (!savedPost) throw Error;

    return savedPost;
  } catch (err) {
    console.log(err);
  }
}

export async function deletSavedPost(savedRecordId) {
  try {
    const statusCode = await databases.deleteDocument(
      appwriteConfig.databaseId,
      appwriteConfig.savesCollectionId,
      savedRecordId
    );

    if (!statusCode) throw Error;

    return { status: "ok" };
  } catch (err) {
    console.log(err);
  }
}
