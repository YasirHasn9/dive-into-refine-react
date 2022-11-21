import { useMany } from "@pankod/refine-core";
import {
  List,
  TextField,
  TagField,
  DateField,
  Table,
  useTable,
  FilterDropdown,
  Select,
  useSelect,
  ShowButton,
  EditButton,
  Space,
} from "@pankod/refine-antd";

import { IPost, ICategory } from "interfaces";

export const PostList: React.FC = () => {
  // useTable fetch data from the api and wraps some hooks around it
  // also data interaction functions will also be provided through hook
  const { tableProps } = useTable<IPost>();

  const categoryIds =
    tableProps?.dataSource?.map((item) => item.category.id) ?? [];
  const { data: categoriesData, isLoading } = useMany<ICategory>({
    resource: "categories",
    ids: categoryIds,
    queryOptions: {
      enabled: categoryIds.length > 0,
    },
  });

  const { selectProps: categorySelectProps } = useSelect<ICategory>({
    resource: "categories",
  });

  return (
    <List>
      <Table {...tableProps} rowKey='id'>
        <Table.Column dataIndex='title' title='title' />
        <Table.Column
          dataIndex='status'
          title='status'
          render={(value) => <TagField value={value} />}
        />
        <Table.Column
          dataIndex='createdAt'
          title='createdAt'
          render={(value) => <DateField format='LLL' value={value} />}
        />
        <Table.Column
          dataIndex={["category", "id"]}
          title='category'
          render={(value) => {
            if (isLoading) {
              return <TextField value='Loading...' />;
            }

            return (
              <TextField
                value={
                  categoriesData?.data.find((item) => item.id === value)?.title
                }
              />
            );
          }}
          filterDropdown={(props) => {
            return (
              // the <FilterDropdown /> works as a bridge between useTable hook and its child which in our case is a `Select`
              <FilterDropdown {...props}>
                <Select
                  style={{ minWidth: 200 }}
                  mode='multiple'
                  placeholder='Select Category'
                  // useSelect hook grabs some information and passes it to `Select`
                  {...categorySelectProps}
                />
              </FilterDropdown>
            );
          }}
        />
        <Table.Column<IPost>
          title='Actions'
          dataIndex='actions'
          render={(_text, record) => (
            <Space>
              <ShowButton size='small' recordItemId={record.id} hideText />
              <EditButton size='small' recordItemId={record.id} hideText />
            </Space>
          )}
        />
      </Table>
    </List>
  );
};
