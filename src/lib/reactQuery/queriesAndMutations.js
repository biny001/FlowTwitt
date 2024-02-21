import { useQuery, useMutation, useInfiniteQuery } from "@tanstack/react-query";
import { createUserAccount, signInAccount } from "../appwrite/api";

export const CreateAccountMutation = () => {
  return useMutation({
    mutationFn: (user) => createUserAccount(user),
    onSuccess: () => {
      console.log("user created successfully");
    },
  });
};

export const useSignInAccount = () => {
  return useMutation({
    mutationFn: (user) => signInAccount(user),

    onSuccess: () => {
      console.log("user signed in successfully");
    },
  });
};
