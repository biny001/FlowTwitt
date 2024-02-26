import { useEffect, useState } from "react";
import {
  useGetCurrentUser,
  useLikePost,
  useSavePost,
} from "../lib/reactQuery/queriesAndMutations";
import { checkIsLiked } from "../lib/utils";

const PostStats = ({ post, userId }) => {
  const likesList = post?.likes.map((user) => {
    user.$id;
  });
  const [likes, setLikes] = useState(likesList);
  const [isSaved, setIsSaved] = useState(false);

  const { mutate: likePost } = useLikePost();
  const { mutate: savePost } = useSavePost();
  const { mutate: deletSavedPost } = useSavePost();

  const { data: currentUser } = useGetCurrentUser();

  const savedPostRecord = currentUser?.save?.find(
    (record) => record.posts.$id === post.$id
  );

  useEffect(() => {
    setIsSaved(!!savedPostRecord);
  }, [currentUser]);

  const handleLike = (e) => {
    e.stopPropagation();

    let likesArray = [...likes];

    if (likesArray.includes(userId)) {
      likesArray = likesArray.filter((Id) => Id !== userId);
    } else {
      likesArray.push(userId);
    }

    setLikes(likesArray);
    likePost({ postId: post.$id, likesArray });
  };
  const handleSave = (e) => {
    e.stopPropagation();

    // console.log("currentUser:", currentUser?.$id);
    // console.log("post:", post);

    if (savedPostRecord) {
      setIsSaved(false);
      return deletSavedPost(savedPostRecord.$id);
    }

    savePost({ userId: currentUser?.$id, postId: post?.$id });
    setIsSaved(true);
  };

  return (
    <div className="flex justify-between items-center z-20">
      {/* like */}
      <div className="flex gap-2 mr-5">
        <img
          src={`${
            checkIsLiked(likes, userId)
              ? "src/assets/icons/liked.svg"
              : "src/assets/icons/like.svg"
          }`}
          alt="like"
          width={20}
          height={20}
          onClick={handleLike}
          className="cursor-pointer"
        />
        <p className=" small-medium lg:base-medium">{likes?.length}</p>
        {/* save */}
      </div>
      <div className="flex gap-2 ">
        <img
          src={`${
            isSaved ? "src/assets/icons/saved.svg" : "src/assets/icons/save.svg"
          }`}
          alt="like"
          width={20}
          height={20}
          onClick={handleSave}
          className="cursor-pointer"
        />
      </div>
    </div>
  );
};

export default PostStats;
