import { useSelector } from "react-redux";
import Loading from "../utils/Loading";
import RecentUploadCard from "./RecentUploadCard";

const RecentUpload = () => {

  const productItem = useSelector((state) => state.productItem.productItem);
  const productLoading = useSelector((state) => state.productItem.productLoading);
  return (
    <div className="flex flex-wrap gap-3 justify-center">
      {productLoading
        ? new Array(7).fill(null).map((el, index) => {
            return (
              <div
                key={index}
                className="bg-slate-100  min-w-[250px] min-h-[200] m-2 my-6 p-16 flex justify-center items-end"
              >
                <Loading />
              </div>
            );
          })
        : productItem.map((el) => {
            return (
              <RecentUploadCard
                key={el.id + "menu"}
                id={el.id}
                name={el.title}
                img={el.imgURL}
                decs={el.category}
                price={el.price}
              />
            );
          })
}
    </div>
  );
};

export default RecentUpload;
