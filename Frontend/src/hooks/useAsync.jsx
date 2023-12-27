import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { SidebarContext } from "../context/SidebarContext";

const useAsync = (asyncFunction) => {
  const [data, setData] = useState([] || {});
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const {
    endDate,
    isUpdate,
    limitData,
    startDate,
    searchText,
    setIsUpdate,
    currentPage,
    filterPrice,
    orderStatus,
    filterCategory,
    shippingAddress,
  } = useContext(SidebarContext);

  useEffect(() => {
    let unmounted = false;
    let source = axios.CancelToken.source();

    (async () => {
      try {
        const res = await asyncFunction({ cancelToken: source.token });
        if (!unmounted) {
          setData(res);
          setError("");
          setLoading(false);
        }
      } catch (err) {
        if (!unmounted) {
          setError(err.message);
          if (axios.isCancel(err)) {
            setError(err.message);
            setLoading(false);
            setData([]);
          } else {
            setError(err.message);
            setLoading(false);
            setData([]);
          }
        }
      }
    })();

    setIsUpdate(false);

    return () => {
      unmounted = true;
      source.cancel("Cancelled in cleanup");
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    endDate,
    isUpdate,
    limitData,
    startDate,
    searchText,
    filterPrice,
    currentPage,
    orderStatus,
    filterCategory,
    shippingAddress,
  ]);

  return {
    data,
    error,
    loading,
  };
};

export default useAsync;
