import React, { useCallback, useEffect, useState } from "react";
import { useContractWrite } from "wagmi";
import { toast } from "react-toastify";

import inkAbi from "@/constants/ABIs/inkAbi";
import { inkContractAddress } from "@/constants/addresses";

const useCreatePost = () => {
  const [content, setContent] = useState();
  const {
    data: postData,
    isLoading: isCreatingPost,
    isSuccess: isPostCreated,
    write: createPost,
    error: postError,
  } = useContractWrite({
    address: inkContractAddress,
    abi: inkAbi,
    functionName: "createPost",
    args: [content], // add this line
  });

  useEffect(() => {
    console.log("postData:", postData);
    console.log(" isCreatingPost:", isCreatingPost);
    console.log(" isPostCreated", isPostCreated);
    console.log("postError:", postError);
    console.log("___________");
  }, [postData, isCreatingPost, isPostCreated]);

  const userCreatePost = async () => {
    try {
      const result = createPost();

      // @ts-ignore
      setContent(result);
    } catch (error) {
      console.error("Error calling createPost:", error);
    }
  };

  return {
    userCreatePost,
    isCreatingPost,
    isPostCreated,
    postError,
  };
};

export default useCreatePost;
