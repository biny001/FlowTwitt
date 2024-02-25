import { Link } from "react-router-dom";
import { formatRelativeDate } from "../lib/utils";
import { useUserContext } from "../context/AuthContext";
import PostStats from "./PostStats";

const PostCard = ({ post }) => {
  const { user } = useUserContext();

  if (!post) return null;
  return (
    <div className="post-card">
      <div className=" flex-between">
        <div className=" flex items-center gap-3">
          <Link to={`/profile/${post?.creator?.$id}`}>
            <img
              src={
                post?.creator?.imageUrl ||
                "src/assets/icons/profile-placeholder.svg"
              }
              alt="creator"
              className="rounded-full w-12 lg:h-12"
            />
          </Link>
          <div className="flex flex-col">
            <p className="base-medium lg:body-bold text-light-1">
              {post?.creator?.name}
            </p>
            <div className="flex-center  gap-2 text-light-3">
              <p className="subtle-semibold lg:small-regular">
                {formatRelativeDate(post.$createdAt)}
              </p>
              -
              <p className="sublte-semibold lg:small-regular">
                {post.location}
              </p>
            </div>
          </div>
        </div>
        <Link
          className={`${user?.id !== post?.creator?.$id && "hidden"} `}
          to={`/update-post/${post.$id}`}
        >
          <img
            src="src/assets/icons/edit.svg"
            alt="edit"
            className="w-5 h-5"
          />
        </Link>
      </div>
      <Link to={`/post/${post?.$id}`}>
        <div className="small-medium lg:base-medium py-5">
          <p className="">{post.caption}</p>
          <ul className=" flex gap-1 mt-2">
            {post?.tags?.map((tag) => {
              return (
                <li
                  key={tag}
                  className=" text-light-3"
                >
                  #{tag}
                </li>
              );
            })}
          </ul>
        </div>

        <img
          src={post?.imageUrl || "src/assets/icons/profile-placeholder.svg"}
          className="post-card_img"
        />
      </Link>
      <PostStats
        post={post}
        userId={user.id}
      />
    </div>
  );
};

export default PostCard;
