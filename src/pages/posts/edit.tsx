import {
  Edit,
  Form,
  useForm,
  Select,
  useSelect,
  Input,
} from "@pankod/refine-antd";
// <useForm> hook provides props, buttons, and query ... technically form data
// this enables the former to have all the props

// <useSelect> hook provides select props

import { IPost } from "interfaces";
export const EditPost = () => {
  // this will initialize the record form
  const { formProps, saveButtonProps, queryResult } = useForm<IPost>();

  const { selectProps: categorySelectProps } = useSelect<IPost>({
    resource: "categories",
    defaultValue: queryResult?.data?.data?.category.id,
  });

  return (
    <Edit saveButtonProps={saveButtonProps}>
      <Form {...formProps} layout='vertical'>
        <Form.Item label='Title' name='title' rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item label='Status' name='status' rules={[{ required: true }]}>
          <Select
            options={[
              {
                label: "Published",
                value: "published",
              },
              {
                label: "Draft",
                value: "draft",
              },
              {
                label: "Rejected",
                value: "rejected",
              },
            ]}
          />
        </Form.Item>
        <Form.Item
          label='Categories'
          //   category is the filed we are triggering
          name={["category", "id"]}
          rules={[{ required: true }]}
        >
          <Select {...categorySelectProps} />
        </Form.Item>
      </Form>
    </Edit>
  );
};
