import React, { useState } from "react";
import { useFormContext } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import FileUploader from "./FileUploader";

import { useUserContext } from "../context/AuthContext";
import { useCreatePost } from "../lib/reactQuery/queriesAndMutations";
const PostForm = ({ post }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useFormContext();
  const [file, setfile] = useState([]);

  const { mutateAsync: CreatePost, isPending: isLoading } = useCreatePost();
  const { user } = useUserContext();
  const navigate = useNavigate();
  const onchange = (acceptedFiles) => {
    // Handle the file change logic here
    console.log("Selected Files:", acceptedFiles);
    setfile(acceptedFiles);
    console.log(user.id);
  };

  async function onSubmit(data) {
    const newData = {
      ...data,
      file: file,
    };

    const newPost = await CreatePost({
      ...newData,
      userId: user?.id, // Add the user id to the post
    });

    if (!newPost) {
      console.log("error creating post");
    }
    console.log("newPost", newPost);
    navigate("/");
    setfile([]);
  }

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-9 w-full max-w-5xl"
      >
        <div className="label">
          <label
            className="shad-form_label "
            htmlFor="caption"
          >
            caption
          </label>
          <textarea
            type="text"
            id="caption"
            className="input shad-textarea custom-scrollbar "
            {...register("caption")}
          />
          {errors.caption && <p className="error">{errors.caption.message}</p>}
        </div>
        <div className="label">
          <label
            className="shad-form_label "
            htmlFor="upload file"
          >
            Upload file
          </label>
          <FileUploader
            className="input shad-textarea custom-scrollbar "
            register={register}
            fieldChange={onchange}
            mediaUrl={post?.imageUrl}
          />
          {errors.imageUrl && (
            <p className="error">{errors.imageUrl.message}</p>
          )}
        </div>

        <div className="label">
          <label htmlFor="location">Add Location</label>
          <div className=" flex items-center relative  ">
            <input
              type="text"
              id="location"
              className="input"
              {...register("location")}
            />
          </div>
          {errors.location && (
            <p className=" error">{errors.location.message}</p>
          )}
        </div>

        <div className="label">
          <label htmlFor="tags">Add Tags (seperted by comma " , ")</label>
          <div className=" flex items-center relative  ">
            <input
              type="text"
              id="tags"
              className="input"
              {...register("tags")}
              placeholder="Art,Expression,Learn"
            />
          </div>
          {errors.Tag && <p className=" error">{errors.Tag.message}</p>}
        </div>
        <div className=" flex gap-4 items-center justify-end">
          <button
            type="button"
            className="shad-button_dark_4   text-center items-center  text-white bg-primary-500 rounded-md hover:bg-primary-600"
          >
            cancel
          </button>
          <button
            type="submit"
            className=" shad-button_primary px-5 py-3  whitespace-nowrap   text-center items-center  text-white bg-primary-500 rounded-md hover:bg-primary-600"
          >
            submit
          </button>
        </div>
      </form>
    </>
  );
};

export default PostForm;
