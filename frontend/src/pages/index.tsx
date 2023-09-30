import CreatePost from "@/components/CreatePost";
import Header from "@/components/Header";
import Posts from "@/components/Posts";
import GetPosts from "@/hooks/GetPosts";
// import { ConnectButton } from "@rainbow-me/rainbowkit";
import Head from "next/head";
import { ToastContainer } from "react-toastify";

export default function Home() {
  return (
    <>
      <Head>
        <title>DxBlog</title>
      </Head>

      <Header />

      <main>
        {/* <button className=" flex  mx-auto items-center text-lg font-semibold justify-center mt-10">
          Register
        </button> */}

        <CreatePost />

        <GetPosts />

        {/* <Posts /> */}
      </main>

      <ToastContainer />
    </>
  );
}
