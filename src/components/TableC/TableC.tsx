import { FC } from "react";
import { Space, Table, Tag } from "antd";
import type { TableProps } from "antd";

interface TableCprops {
  dataSource: any[];
  columns: TableProps["columns"];
  size: string;
}
const TableC: FC<TableProps> = ({ dataSource, columns, size = "large" }) => {
  return (

      <Table 
   
      style={{ pointerEvents: "auto" }} // Chặn mọi thao tác
      size={size} columns={columns} dataSource={dataSource} />

  );
};

export default TableC;
