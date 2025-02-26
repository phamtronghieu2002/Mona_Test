import FormC, { FieldProps } from "@/components/FormC/FormC";
import { Button } from "antd";
import React, { FC, useEffect, useReducer, useRef, useState } from "react";
import data, { ProductType } from "@/mockData";
import TableC from "@/components/TableC/TableC";
import column from "@/pages/Home/components/CreateOrder/Column";
import ModalConfirmOrder from "@/components/Modal/ModalConfirmOrder";
import Pay from "@/pages/Home/components/Pay/Pay";
import reducer from "@/pages/Home/components/CreateOrder/reducer";
import { SET_FORM_FIELD } from "@/pages/Home/components/CreateOrder/constant";
import {
  addProductToCart,
  setFormField,
} from "@/pages/Home/components/CreateOrder/actions";

interface CreateOrderProps {}

export interface OrderStateI {
  cart: ProductType[];
  orderInfor: {
    type_pay: number;
    refund: number;
  };
  customer_infor: any;
}

interface OrderContextI {
  orderState: OrderStateI;
  dispatch: React.Dispatch<any>;
}
export const OrderContext = React.createContext<OrderContextI>({
  orderState: {
    cart: [],
    orderInfor: {
      type_pay: 0,
      refund: 0,
    },
    customer_infor: {},
  },
  dispatch: () => {},
});

const initValues: OrderStateI = {
  cart: [],
  orderInfor: {
    type_pay: 2,
    refund: 0,
  },
  customer_infor: {},
};

const CreateOrder: FC<CreateOrderProps> = () => {
  const [products, setProduct] = useState<ProductType[]>([]);

  const [orderState, dispatch] = useReducer(reducer, initValues);

  const handleChooseProduct = (productId: number) => {
    const product = products.find((p) => p.id === productId);
    if (product) {
      const existProduct = orderState.cart.find((p: any) => p.id === productId);
      if (!existProduct) {
        const newProductSelect = [...orderState.cart, product];
        dispatch(addProductToCart(newProductSelect));
      }
      return;
    }
  };

  const formFields: FieldProps[] = [
    {
      name: "customer_name",
      type: "input",
      label: "Tên khách hàng",
      placeholder: " Nhập tên khách hàng",
      onChange: (name: string, value: string) => {
        dispatch(setFormField(name, value));
      },
      rules: [{ required: true, message: "Please input your customer name!" }],
    },

    {
      name: "email",
      type: "input",
      label: "Email",
      placeholder: "Nhập email",
      onChange: (name: string, value: string) => {
        dispatch(setFormField(name, value));
      },
      rules: [
        { required: true, message: "Please input your email!" },
        { type: "email", message: "The input is not valid E-mail!" },
      ],
    },

    {
      name: "phone",
      type: "input",
      label: "Số điện thoại",
      onChange: (name: string, value: string) => {
        dispatch(setFormField(name, value));
      },
      placeholder: "Nhập số điện thoại",
      rules: [{ required: true, message: "Please input your phone number!" }],
    },
    // select option
    {
      name: "product_select",
      type: "select",
      label: "Sản phẩm",
      placeholder: "Chọn sản phẩm",
      options: products.map((product: any) => ({
        title: product.product_name,
        value: product.id,
      })),
      onChange: (name: string, value: string) => {
        handleChooseProduct(Number(value));
      },
      rules: [{ required: true, message: "Please select your product!" }],
    },
  ];

  const fetchProduct = () => {
    setProduct(data.products);
  };
  console.log("====================================");
  console.log("OrderState >>", orderState);
  console.log("====================================");
  useEffect(() => {
    fetchProduct();
  }, []);

  const buttonRef = useRef<HTMLButtonElement>(null);

  return (
    <OrderContext.Provider
      value={{
        orderState,
        dispatch,
      }}
    >
      <h1 className="text-2xl text-center mb-10">Tạo đơn hàng</h1>
      <div className="form-order flex row">
        <div className="col-md-3 border p-3">
          <div className="content">
            <FormC
              onSubmit={() => {}}
              chunkSize={1}
              ref={buttonRef}
              fields={formFields}
            />
          </div>
        </div>
        <div className="col-md-9 border">
          <TableC
            dataSource={orderState.cart.map((product: ProductType) => ({
              ...product,
              key: product.id,
            }))}
            columns={column(orderState, dispatch)}
          />

          <div className="pay_information flex justify-end mb-5 mt-3">
            <Pay />
          </div>
        </div>
        <div className="actions flex justify-end mt-3">
          <div>
            <ModalConfirmOrder
              title="xác nhận thanh toán"
              data={orderState.customer_infor}
              button={
                <Button
                  disabled={
                    !orderState.customer_infor?.customer_name ||
                    !orderState.customer_infor?.email ||
                    !orderState.customer_infor?.phone ||
                    orderState.cart.length === 0
                  }
                  type="primary"
                >
                  Thanh toán
                </Button>
              }
            />
          </div>
        </div>
      </div>
    </OrderContext.Provider>
  );
};

export default CreateOrder;
