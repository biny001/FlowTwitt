import Loader from "../components/Loader";
import PostCard from "../components/PostCard";
import { useGetRecentPosts } from "../lib/reactQuery/queriesAndMutations";

const Home = () => {
  const {
    data: posts,
    isPending: isPostsLoading,
    isError: isErrorPosts,
  } = useGetRecentPosts();
  return (
    <div className="flex flex-1">
      <div className="home-container">
        <div className="home-posts">
          <h2 className="h3-bold md:h2-bold text-left w-full">Home Feed</h2>
          {isPostsLoading && !posts ? (
            <Loader />
          ) : (
            <ul className=" flex flex-col flex-1 gap-9 w-full">
              {posts?.documents.map((post) => (
                <PostCard
                  key={post?.$id}
                  post={post}
                />
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
