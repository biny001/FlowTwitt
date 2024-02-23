import React from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import FileUploader from "./FileUploader";

const PostForm = ({ post }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onchange = (acceptedFiles) => {
    // Handle the file change logic here
    console.log("Selected Files:", acceptedFiles);
  };

  return (
    <>
      <form className="flex flex-col gap-9 w-full max-w-5xl">
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
            {...register("imageUrl")}
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
          <label htmlFor="location">Add Tags (seperted by comma " , ")</label>
          <div className=" flex items-center relative  ">
            <input
              type="text"
              id="Tag"
              className="input"
              {...register("Tag")}
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
