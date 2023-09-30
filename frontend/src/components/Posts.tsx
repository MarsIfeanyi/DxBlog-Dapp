import Link from "next/link";
import React from "react";

type Props = {};

const Posts = (props: Props) => {
  return (
    <div>
      <h1>All Post</h1>

      <Link href="/post">
        <h2>Posts</h2>

        <p>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Non magnam
          ullam ipsum tenetur eaque corrupti, quod soluta quos excepturi itaque
          voluptas veritatis nam consectetur placeat exercitationem dolorum
          doloremque impedit. Doloribus.
        </p>
      </Link>
    </div>
  );
};

export default Posts;
