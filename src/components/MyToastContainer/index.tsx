import { Bounce, ToastContainer } from 'react-toastify';

type ToastContainerProps = {
  children: React.ReactNode;
};

export function MyToastContainer({ children }: ToastContainerProps) {
  return (
    <>
      {children}
      <ToastContainer
        position='top-center'
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={true}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme='light'
        transition={Bounce}
      />
    </>
  );
}
