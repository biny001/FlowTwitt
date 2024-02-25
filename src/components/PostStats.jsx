const PostStats = ({ post, userId }) => {
  return (
    <div className="flex justify-between items-center z-20">
      {/* like */}
      <div className="flex gap-2 mr-5">
        <img
          src="src/assets/icons/like.svg"
          alt="like"
          width={20}
          height={20}
          onClick={() => {}}
          className="cursor-pointer"
        />
        <p className=" small-medium lg:base-medium">0</p>
        {/* save */}
      </div>
      <div className="flex gap-2 ">
        <img
          src="src/assets/icons/save.svg"
          alt="like"
          width={20}
          height={20}
          onClick={() => {}}
          className="cursor-pointer"
        />
      </div>
    </div>
  );
};

export default PostStats;
