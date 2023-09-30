import React, { Fragment, useEffect, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";

import { toast } from "react-toastify";
import useCreatePost from "@/hooks/useCreatePost";
import { inkContractAddress } from "@/constants/addresses";
import { useContractWrite } from "wagmi";
import inkAbi from "@/constants/ABIs/inkAbi";

type Props = {};

const CreatePost = (props: Props) => {
  const [sendingTx, setSendingTx] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [content, setContent] = useState("");

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
    args: [content],
  });

  useEffect(() => {
    console.log("postData:", postData);
    console.log(" isCreatingPost:", isCreatingPost);
    console.log(" isPostCreated", isPostCreated);
    console.log("postError:", postError);
    console.log("___________");
  }, [postData, isCreatingPost, isPostCreated]);

  function closeModal() {
    if (sendingTx) return;
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  const handleCreatePost = async (e: any) => {
    e.preventDefault();
    if (!content) return toast.info("Please provide content");

    try {
      setSendingTx(true);
      const tx = createPost({ args: [content] });
      // @ts-ignore
      const receipt = await tx.wait();
      if (receipt.status === 0) return toast.error("Failed to Create Post");

      toast.success("Post Created!!");
      setIsOpen(false);
    } catch (error: unknown) {
      console.error("Something went wrong", error);
    } finally {
      closeModal();
    }
  };

  return (
    <Fragment>
      <button
        onClick={openModal}
        className="w-[fit-content] block rounded-md mx-auto bg-blue-400 px-4 py-4 text-sm font-medium text-white hover:bg-opacity-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
      >
        Create Post
      </button>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-50" />
          </Transition.Child>
          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900 items-center text-center"
                  >
                    Create your Post
                  </Dialog.Title>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      Keep your audience updated
                    </p>
                  </div>
                  <form className="mt-4 space-y-4" onSubmit={handleCreatePost}>
                    <div className="flex flex-col">
                      <label className="font-bold">Content</label>

                      <textarea
                        value={content}
                        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                          setContent(e.target.value)
                        }
                        name="content"
                        id="content"
                        cols={50}
                        rows={10}
                        placeholder="your contents"
                        required
                        className="outline-0 py-2 px-1 rounded-lg mt-2 border border-blue-400"
                      ></textarea>
                    </div>

                    <button
                      type="submit"
                      className="cursor-pointer w-full rounded-md bg-blue-400 p-3 text-sm font-medium text-white hover:bg-opacity-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 text-center"
                    >
                      {sendingTx ? "Creating Post..." : "Create Post"}
                    </button>
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </Fragment>
  );
};

export default CreatePost;
