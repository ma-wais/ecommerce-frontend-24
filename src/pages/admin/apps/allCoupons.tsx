import { useAllCouponsQuery, useDeleteCouponMutation } from "../../../redux/api/paymentAPI";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { Column } from "react-table";
import AdminSidebar from "../../../components/admin/AdminSidebar";
import { Skeleton } from "../../../components/loader";
import { ReactElement, useEffect, useState } from "react";
import TableHOC from "../../../components/admin/TableHOC";
import { FaTrash } from "react-icons/fa";
import { responseToast } from "../../../utils/features";

interface DataType {
  code: string;
  amount: number;
  action: ReactElement;
}

const columns: Column<DataType>[] = [
  {
    Header: "Code",
    accessor: "code",
  },
  {
    Header: "Discount",
    accessor: "amount",
  },
  {
    Header: "Action",
    accessor: "action",
  }
]

const AllCoupons = () => {
  const { user } = useSelector((state: RootState) => state.userReducer);

  const {isLoading, data } = useAllCouponsQuery(user?._id!);
  const [deleteCoupon] = useDeleteCouponMutation();

  const [rows, setRows] = useState<DataType[]>([]);

  const deleteHandler = async (couponId : string) => {
    const res = await deleteCoupon(couponId)
    responseToast(res, null, "");

  }

  useEffect(() => {
    if (data)
      setRows(
      data.coupons.map((i: any) => ({
        code: i.code,
        amount: i.amount,
        action: (
          <button onClick={() => deleteHandler(i._id)}>
            <FaTrash />
          </button>
        )
      }))
    );
}, [data]) ;

 console.log(data?.coupons)
 const TableComponent = TableHOC<DataType>(columns, rows, "dashboard-product-box", "Coupons", rows.length > 6);


  return (
    <div className="admin-container" style={{marginBottom:"130px"}}>
    <AdminSidebar />
      <main>{isLoading ? <Skeleton length={20} /> : <TableComponent />}</main>

    
  </div>
  );
};

export default AllCoupons;
