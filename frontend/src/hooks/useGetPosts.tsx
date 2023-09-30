// useGetPosts.js
import inkAbi from "@/constants/ABIs/inkAbi";
import { inkContractAddress } from "@/constants/addresses";
import React, { useCallback } from "react";
import { readContract } from "@wagmi/core";

type Props = {};

const useGetPosts = () => {
  const inkContract = {
    address: inkContractAddress as `0x${string}`,
    abi: inkAbi,
  };

  const fetchPosts = useCallback(
    async (start: number, end: number) => {
      const data = await readContract({
        ...inkContract,
        functionName: "getPosts",
        args: [start, end],
      });

      console.log(data);

      return data;
    },
    [inkContract]
  );

  return fetchPosts;
};

export default useGetPosts;
