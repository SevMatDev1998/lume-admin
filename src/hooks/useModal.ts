import { useContext } from "react";
import { ModalContext, PropsType } from "../providers/ModalProvider";


const useModal = () => {
  const context = useContext(ModalContext);

  if (!context?.onSetComponent || !context?.onSetComponentProps) {
    throw new Error("onSetComponent or onSetComponentProps must be defined");
  }

  const { onSetComponent, onSetComponentProps } = context;

  return <C extends ModalFC<any>>(
    Component: C,
    props: Omit<PropsType<Parameters<C>[0]>, "onCancel">
  ) => {
    onSetComponent(Component);
    onSetComponentProps(props);
  };
};

export default useModal;