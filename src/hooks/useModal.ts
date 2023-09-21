import { useState } from "react";

/**
 * @description : 모달 커스텀훅
 * @author : 장윤수
 * @update : 2023-09-21,
 * @version 1.0.0,
 * @see None,
 */
const useModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return { isModalOpen, openModal, closeModal };
};

export default useModal;
