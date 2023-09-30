import inkAbi from "@/constants/ABIs/inkAbi";
import { inkContractAddress } from "@/constants/addresses";
import React, { useEffect, useState } from "react";
import { useContractRead, useContractWrite } from "wagmi";
inkAbi;

type Props = {};

const GetPosts = (props: Props) => {
  const [start, setStart] = useState<number>(0);
  const [end, setEnd] = useState<number>(0);

  const {
    data: getPostData,
    isError: isGetPostError,
    isLoading: isGettingPost,
  } = useContractRead({
    address: inkContractAddress,
    abi: inkAbi,
    functionName: "getPosts",
    args: [start, end],
  });

  useEffect(() => {
    console.log("getPostData:", getPostData);
    console.log(" isGettingPost:", isGettingPost);
    console.log("isGetPostError:", isGetPostError);
    console.log("___________");
  }, [getPostData, isGettingPost, isGetPostError]);

  return (
    <div>
      <form action="">
        <div className="flex flex-col">
          <label className="font-bold">Start</label>
          <input
            value={start}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setStart(Number(e.target.value))
            }
            type="number"
            className="outline-0 py-2 px-1 rounded-lg mt-2 border border-blue-400"
          />
        </div>

        <div className="flex flex-col">
          <label className="font-bold">End</label>
          <input
            value={end}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setEnd(Number(e.target.value))
            }
            type="number"
            className="outline-0 py-2 px-1 rounded-lg mt-2 border border-blue-400"
          />
        </div>

        <button>Get Posts </button>
      </form>
    </div>
  );
};

export default GetPosts;
