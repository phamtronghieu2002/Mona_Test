import FormC, { FieldProps } from "@/components/FormC/FormC";
import ModalC from "@/components/ModalC/ModalC";
import TableC from "@/components/TableC/TableC";
import column from "@/pages/Home/components/CreateOrder/Column";
import {
  OrderContext,
  OrderStateI,
} from "@/pages/Home/components/CreateOrder/CreateOrder";
import Pay from "@/pages/Home/components/Pay/Pay";
import { Button } from "antd";

import { FC, useContext, useEffect } from "react";

interface ModalConfirmOrderProps {
  data?: any;
  title: string;
  button: React.ReactNode;
  callback?: () => void;
  open?: boolean;
}

const ModalConfirmOrder: FC<ModalConfirmOrderProps> = ({
  button,
  callback,
  title,
  data,
}) => {
  return (
    <ModalC
      width={1000}
      title="Xác nhận thanh toán"
      button={button}
      children={(action) => (
        <ConfirmOrder
          data={data}
          title={title}
          actions={action}
          callback={callback}
        />
      )}
    />
  );
};

const ConfirmOrder: FC<{
  title: string;
  data?: any;
  actions: any;
  callback?: () => void;
}> = ({ title, actions, callback, data }) => {
  const { orderState, dispatch } = useContext<any>(OrderContext);

  const formFields: FieldProps[] = [
    {
      name: "customer_name",
      type: "input",
      label: "Tên khách hàng",
      placeholder: " Nhập tên khách hàng",
      disable: true,
    },

    {
      name: "email",
      type: "input",
      label: "Email",
      placeholder: "Nhập email",
      disable: true,
    },

    {
      name: "phone",
      type: "input",
      label: "Số điện thoại",
      placeholder: "Nhập số điện thoại",
      disable: true,
    },
    // select option
  ];

  return (
    <div className="">
      <FormC chunkSize={3} initData={data} fields={formFields} />
      <TableC
        dataSource={orderState.cart}
        columns={column(orderState.cart, dispatch, true)}
      />
      <Pay />
    </div>
  );
};
export default ModalConfirmOrder;
