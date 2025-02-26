import React, { FC, useContext, useEffect, useMemo, useState } from "react";
import { Card, Input, InputNumber, Space } from "antd";
import FormC, { FieldProps } from "@/components/FormC/FormC";
import { ProductType } from "@/mockData";
import { OrderContext } from "@/pages/Home/components/CreateOrder/CreateOrder";
import { addPayInfo } from "@/pages/Home/components/CreateOrder/actions";
interface PayProps {
  cart?: any;
  orderInfor?: any;
  setOrderInfor?: (value: any) => void;
}

const Pay: FC<PayProps> = React.memo(() => {
  const { orderState, dispatch } = useContext<any>(OrderContext);
  const [refund, setRefund] = useState<number>(orderState.orderInfor.refund);
  const [type_pay, setType_pay] = useState(orderState.orderInfor.type_pay);

  const total = useMemo(() => {
    const result =
      orderState.cart?.reduce((acc: number, item: ProductType) => {
        const { type: type_discount, value: discount = 0 } =
          item?.active_discount || {};
        const total_price_product =
          type_discount === "percent"
            ? item.product_price * item.product_quantity * (1 - discount / 100)
            : item.product_price * item.product_quantity - discount;
        return acc + total_price_product;
      }, 0) || 0;

    return result;
  }, [orderState.cart]);

  const handleCalcRefund = () => {
    if (refund > total) {
      return refund - total;
    }
    return 0;
  };

  const formFields: FieldProps[] = [
    {
      name: "type_pay",
      type: "radio",
      label: "Thanh toán bằng",
      options: [
        {
          title: "Tiền mặt",
          value: 1,
        },
        {
          title: "Chuyển khoản",
          value: 2,
        },
      ],
      onChange: (name: string, value: any) => {
        setType_pay(parseInt(value));
        dispatch(
          addPayInfo({
            type_pay: parseInt(value),
            refund: refund,
          })
        );
        if (value == "2") {
          setRefund(0);
        }
      },
      rules: [{ required: true, message: "Please select" }],
    },
  ];
  useEffect(() => {
    dispatch(
      addPayInfo({
        type_pay: type_pay,
        refund,
      })
    );
  }, [refund]);
  return (
    <Space direction="vertical" size={16}>
      <Card style={{ width: 500 }}>
        <h1 className="text-lg mb-2 font-bold">Thông tin thanh toán</h1>
        <FormC
          initData={{
            type_pay,
          }}
          chunkSize={1}
          fields={formFields}
        />
        <div className="mb-3 flex gap-3 items-center">
          <span>Tổng tiền:</span>
          <span className="text-lg font-bold">
            {total.toLocaleString("vi-VN", {
              style: "currency",
              currency: "VND",
            })}
          </span>
        </div>
        {type_pay == 1 && (
          <div>
            <span>Tiền khách đưa:</span>
            <span>
              <InputNumber
                value={refund}
                min={0}
                onChange={(value) => {
                  setRefund(value ?? 0);

                }}
                className="w-full"
                formatter={(value) =>
                  `${value} đ`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                }
                placeholder="Nhập số tiền khách đưa"
              />
            </span>
          </div>
        )}
        <div className=" flex items-center gap-1">
          <span>Tiền thối cho khách:</span>
          <span className="font-bold">
            {handleCalcRefund().toLocaleString("vi-VN", {
              style: "currency",
              currency: "VND",
            })}
          </span>
        </div>
      </Card>
    </Space>
  );
});

export default Pay;
