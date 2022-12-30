import React, { useState, useEffect } from "react";

/** Import Orbis SDK */
import { Orbis } from "@orbisclub/orbis-sdk";
import { Button } from "@chakra-ui/react";

/**
 * Initialize the Orbis class object:
 * You can make this object available on other components
 * by passing it as a prop or by using a context.
 */
let orbis = new Orbis();

export default function App() {
  /** The user object */
  const [user, setUser] = useState();

  /** Calls the Orbis SDK and handle the results */
  async function connect() {
    let res = await orbis.connect();

    /** Check if connection is successful or not */
    if (res.status == 200) {
      setUser(res.did);
    } else {
      console.log("Error connecting to Ceramic: ", res);
      alert("Error connecting to Ceramic.");
    }
  }

  async function createPost() {
    let res = await orbis.createPost({ body: "Looooo!",
  title:"This is Title of post",
  data:{
    unlockAddress:"0xc37ffe60f6c3830ed0e92939d41ad1ecf8fd46d9",
    creatorName:"Rahul"

  },
  media:[
    {
        url:"www.github.com/rkmonarch"
    }
  ],

  tags:[
   { slug:"Test Tag",title:"Title of tags"}
  ]
  });
    console.log("Created post:",res.doc);
  }

  async function getPost() {
    // console.log(res.doc);
    let { data, error } = await orbis.getPosts(
     { tag:"Test Tag"}
    );
    console.log(data);
  }

  return (
    <>
      <div>
        {user ? (
          <p>Connected with: {user}</p>
        ) : (
          <button onClick={() => connect()}>Connect</button>
        )}
      </div>
      <Button onClick={createPost}>post</Button>
      <Button onClick={getPost}>GET post</Button>
    </>
  );
}
