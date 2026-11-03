import { Children, createContext, FC, PropsWithChildren, useMemo, useState } from "react";
import cls from "../utils/cls";
import ModalLayout from "../components/public/modal/ModalLayout";


interface IModalContext {
  onSetComponent: (Component: FC) => void;
  onSetComponentProps: (props: object) => void;
}

export type PropsType<P extends object = object> = {
  title?: string;
  className?: string;
  disableClose?: boolean;
  disableCancel?: boolean;
} & P;

export const ModalContext = createContext<IModalContext | null>(null);

const ModalProvider: FC<PropsWithChildren> = ({ children }) => {
  const [Component, setComponent] = useState<ModalFC | null>(null);
  const [{ title = "", className, disableCancel, disableClose, ...props }, setProps] = useState<PropsType>({});

  const handleOnSetComponent = (Component: ModalFC) => {
    setComponent(() => Component);
  };

  const handleOnSetComponentProps = <P extends object>(props: PropsType<P>) => {
    setProps(props);
  };

  const value = useMemo<IModalContext>(
    () => ({
      onSetComponent: handleOnSetComponent,
      onSetComponentProps: handleOnSetComponentProps
    }),
    []
  );

  const handleOnCancel = () => {
    if (!disableCancel) {
      setComponent(null);
      setProps({});
    }
  };

  const childs = useMemo(() => Children.only(children), [children]);

  return (
    <ModalContext.Provider value={value}>
      <div
        className={cls("w-full", {
          blur: !!Component
        })}
      >
        {childs}
      </div>
      {!!Component && (
        <ModalLayout className={className} title={title} disableClose={disableClose} onCancel={handleOnCancel}>
          <Component onCancel={handleOnCancel} {...props} />
        </ModalLayout>
      )}
    </ModalContext.Provider>
  );
};

export default ModalProvider;