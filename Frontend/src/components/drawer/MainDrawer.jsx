import { Dialog, Transition } from "@headlessui/react";
import React, { Fragment, useContext } from "react";
import { SidebarContext } from "../../context/SidebarContext";

const MainDrawer = ({ children }) => {
  const { isDrawerOpen, closeDrawer } = useContext(SidebarContext);

  return (
    <Transition.Root show={isDrawerOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={closeDrawer}>
        <Transition.Child
          as={Fragment}
          enter="ease-in-out duration-500"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in-out duration-500"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-500 sm:duration-700"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-500 sm:duration-700"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="pointer-events-auto w-screen lg:max-w-3xl md:max-w-full">
                  <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                    {children}
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default MainDrawer;

{
  /* <Transition
  show={isDrawerOpen}
  enter="transition duration-300 transform"
  enterFrom="translate-x-full"
  enterTo="translate-x-0"
  leave="transition duration-300 transform"
  leaveFrom="translate-x-0"
  leaveTo="translate-x-full"
>
  <div className="fixed top-0 right-0 h-full w-full overflow-x-hidden">
    <div
      onClick={closeDrawer}
      className="h-screen hidden md:block w-1/3 bg-black opacity-50 fixed top-0 left-0 z-40"
    ></div>

    {children}
  </div>
</Transition>; */
}
