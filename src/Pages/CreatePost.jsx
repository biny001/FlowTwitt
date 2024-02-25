import { FormProvider, useForm } from "react-hook-form";
import PostForm from "../components/PostForm";
const CreatePost = () => {
  const methods = useForm();

  return (
    <div className=" flex flex-1">
      <div className=" common-container">
        <div className=" gap-3 justify-start w-full max-w-5xl  flex-start">
          <img
            src="src/assets/icons/add-post.svg"
            alt="add-post"
            width={36}
            height={36}
          />
          <h2 className=" h3-bold md:h2-bold text-left w-full">Create Post</h2>
        </div>
        <FormProvider {...methods}>
          <PostForm />
        </FormProvider>
      </div>
    </div>
  );
};

export default CreatePost;
