import { useShow, useOne } from "@pankod/refine-core";
import { Show, Typography, Tag } from "@pankod/refine-antd";

// to pull related data from our api, we need a hook where we can link it to the api 🎯<useShow>
// this hook enables us to pull/fetch a single record
import { IPost, ICategory } from "interfaces";
// Each record may have some information, to pull the information individually for each record
// Refine provides a new hook called 🎯<seOne> where you can pass to it an endpoint that is related to our api
// different end point means different resource on our api

const { Title, Text } = Typography;
export const PostShow = () => {
  const {
    queryResult: { data, isLoading },
  } = useShow<IPost>();
  const record = data?.data;

  const { data: categoriesInfo } = useOne<ICategory>({
    resource: "categories",
    id: record?.category.id || "",
    queryOptions: {
      enabled: !!record?.category.id,
    },
  });
  return (
    <Show isLoading={isLoading}>
      <Title level={5}>Title</Title>
      <Text>{record?.title}</Text>

      <Title level={5}>Status</Title>
      <Text>
        <Tag>{record?.status}</Tag>
      </Text>

      <Title level={5}>Category</Title>
      <Text>
        <Tag>{categoriesInfo?.data.title}</Tag>
      </Text>
    </Show>
  );
};
