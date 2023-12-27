import { createContext, useState } from "react";

export const SidebarContext = createContext();

export const SidebarProvider = ({ children }) => {
  // react hook
  const [endDate, setEndDate] = useState("");
  const [limitData, setLimitData] = useState(20);
  const [isUpdate, setIsUpdate] = useState(false);
  const [startDate, setStartDate] = useState("");
  const [searchText, setSearchText] = useState("");
  const [servicesId, setServicesId] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [orderStatus, setOrderStatus] = useState("");
  const [filterPrice, setFilterPrice] = useState("");
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [filterCategory, setFilterCategory] = useState("");
  const [shippingAddress, setShippingAddress] = useState("");
  const [parentCategories, setParentCategories] = useState([]);
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);

  // handler
  const closeDrawer = () => setIsDrawerOpen(false);
  const toggleDrawer = () => setIsDrawerOpen(!isDrawerOpen);
  const handleCloseDeleteModal = () => setIsOpenDeleteModal(!isOpenDeleteModal);

  return (
    <SidebarContext.Provider
      value={{
        isUpdate,
        limitData,
        searchText,
        servicesId,
        setIsUpdate,
        closeDrawer,
        orderStatus,
        currentPage,
        endDate,
        setEndDate,
        startDate,
        setStartDate,
        filterPrice,
        setLimitData,
        toggleDrawer,
        isDrawerOpen,
        setSearchText,
        setServicesId,
        filterCategory,
        setCurrentPage,
        setFilterPrice,
        setOrderStatus,
        shippingAddress,
        setIsDrawerOpen,
        parentCategories,
        isOpenDeleteModal,
        setFilterCategory,
        setShippingAddress,
        setParentCategories,
        handleCloseDeleteModal,
      }}
    >
      {children}
    </SidebarContext.Provider>
  );
};
