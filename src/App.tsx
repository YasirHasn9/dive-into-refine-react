import React from "react";

import { Refine } from "@pankod/refine-core";
import {
  notificationProvider,
  Layout,
  ReadyPage,
  ErrorComponent,
} from "@pankod/refine-antd";
// components
import { PostList } from "pages/posts/lists";

import dataProvider from "@pankod/refine-simple-rest";
import "@pankod/refine-antd/dist/styles.min.css";
import routerProvider from "@pankod/refine-react-router-v6";

function App() {
  return (
    <Refine
      dataProvider={dataProvider("https://api.fake-rest.refine.dev")}
      notificationProvider={notificationProvider}
      Layout={Layout}
      ReadyPage={ReadyPage}
      catchAll={<ErrorComponent />}
      routerProvider={routerProvider}
      resources={[{ name: "posts", list: PostList }]}
    />
  );
}

export default App;
