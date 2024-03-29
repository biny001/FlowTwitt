import React, { useCallback, useState, forwardRef, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { useFormContext } from "react-hook-form";

const FileUploader = forwardRef(({ fieldChange, mediaUrl }, ref) => {
  const [file, setFile] = useState([]);
  const [fileUrl, setFileUrl] = useState("");
  const { register } = useFormContext();

  const onDrop = useCallback(
    (acceptedFiles) => {
      setFile(acceptedFiles);
      fieldChange(acceptedFiles);
      setFileUrl(URL.createObjectURL(acceptedFiles[0]));
    },
    [fieldChange]
  );

  useEffect(() => {
    console.log(fileUrl, file);
  }, [fileUrl, file]);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".png", ".jpeg", ".jpg", ".svg"],
    },
  });

  return (
    <div
      ref={ref}
      className="flex flex-col flex-center cursor-pointer bg-dark-3 rounded-xl"
      {...getRootProps()}
    >
      <input
        className="cursor-pointer"
        {...getInputProps()}
        {...register("file")}
      />
      {fileUrl ? (
        <>
          <div className="flex flex-1 justify-center w-full p-5 lg:p-10">
            <img
              src={fileUrl}
              className="file_uploader-img"
              alt="file preview"
            />
          </div>
          <p className="file_uploader-label">
            Click or drag picture to replace
          </p>
        </>
      ) : (
        <div className="file_uploader-box">
          <img
            width={96}
            height={77}
            src="src/assets/icons/file-upload.svg"
            alt="file-upload"
          />
          <h3 className="base-medium text-light-2 mb-2 mt-2">
            Drag photo to upload
          </h3>
          <p className="text-light-4 small-regular mb-6">SVG, PNG, JPG</p>
          <button className="h-10 bg-dark-4 px-3 text-light-1 flex gap-2 items-center rounded-lg">
            Select file
          </button>
        </div>
      )}
    </div>
  );
});

export default FileUploader;
