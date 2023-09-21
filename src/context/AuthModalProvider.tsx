import { ReactNode, createContext, useState } from "react";

interface AuthModalContextInterface {
  openModal: () => void;
  closeModal: () => void;
  isModalOpen: boolean;
}

export const AuthModalContext = createContext<AuthModalContextInterface>({
  openModal: () => {},
  closeModal: () => {},
  isModalOpen: false,
});

const AuthModalProvider = ({ children }: { children: ReactNode }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <AuthModalContext.Provider value={{ isModalOpen, openModal, closeModal }}>
      {children}
    </AuthModalContext.Provider>
  );
};

export default AuthModalProvider;
