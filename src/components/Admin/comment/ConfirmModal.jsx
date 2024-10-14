/* eslint-disable react/prop-types */
import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";

const ConfirmModal = ({ isOpen, onConfirm, onCancel, message, btn1, btn2 }) => {
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={onCancel}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          <div className="fixed inset-0 flex items-center justify-center p-4">
            <Dialog.Panel className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
              <Dialog.Title className="text-lg font-bold">
                {message}
              </Dialog.Title>

              <div className="mt-4 flex justify-end space-x-4">
                <button
                  className="px-4 py-2 text-gray-700 bg-gray-200 rounded-md"
                  onClick={onCancel}
                >
                  {btn1}
                </button>
                <button
                  className="px-4 py-2 text-white bg-red-600 rounded-md"
                  onClick={onConfirm}
                >
                  {btn2}
                </button>
              </div>
            </Dialog.Panel>
          </div>
        </Transition.Child>
      </Dialog>
    </Transition>
  );
};

export default ConfirmModal;
