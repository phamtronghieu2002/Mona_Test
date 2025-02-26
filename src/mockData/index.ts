/*sản phẩm thì có 

, mỗi item biểu diễn 1 sản phẩm bao gồm tên sản phẩm, đơn giá, số lượng và mã khuyến mãi(2), người dùng được phép thay đổi số lượng và đơn giá của sản phẩm.

*/

interface PromotionType {
  id: string;
  promotion_name: string;
  type: string;
  value:number;
}

export interface ProductType {
  id: number;
  product_name: string;
  product_price: number;
  product_quantity: number;
  discounts: PromotionType[];
  active_discount?: PromotionType;
}
const data = {
  products: [
    {
      id: 1,
      product_name: "iPhone 13 Pro Max",
      product_price: 10000000,
      product_quantity: 1,

      discounts: [
        {
          id: "km01",
          promotion_name: "Giảm giá 10%",
          type: "percent",
          value:50
        },
        {
          id: "km03",
          promotion_name: "Sản phẩm giảm giá 300k",
          type: "mount",
          value:300000
        },
      ],
   
    },
    {
      id: 2,
      product_name: "Samsung Galaxy S21 Ultra",
      product_price: 8000000,
      product_quantity: 1,
   
      discounts: [
        {
          id: "km02",
          promotion_name: "Giảm giá 20%",
          type: "percent",
          value:20
        },
        {
          id: "km04",
          promotion_name: "Sản phẩm giảm giá 50k",
          type: "mount",
          value:500000
        },
      ],
   
    },
    {
      id: 3,
      product_name: "Xiaomi Mi 11",
      product_price: 6000000,
      product_quantity: 1,
   
      discounts: [
        {
          id: "km01",
          promotion_name: "Giảm giá 10%",
          type: "percent",
          value:10
        },
        {
          id: "km04",
          promotion_name: "Sản phẩm giảm giá 50k",
          type: "mount",
          value:50000
        },
      ],
 
    },
  ],
};

export default data;
