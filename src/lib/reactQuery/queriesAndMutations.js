import {
  useQuery,
  useMutation,
  useInfiniteQuery,
  useQueryClient,
} from "@tanstack/react-query";
import {
  Signout,
  createPost,
  createUserAccount,
  getRecentPost,
  signInAccount,
} from "../appwrite/api";
import { QUERY_KEYS } from "./queryKeys";


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

export const useSignOutAccount = () => {
  return useMutation({
    mutationFn: Signout,
    onSuccess: () => {
      console.log("user Signed out");
    },
  });
};

export const useCreatePost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (post) => createPost(post),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_RECENT_POSTS],
      });
      console.log("post created successfully");
    },
  });
};

export const useGetRecentPosts = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_RECENT_POSTS],
    queryFn: getRecentPost,
  });
};
