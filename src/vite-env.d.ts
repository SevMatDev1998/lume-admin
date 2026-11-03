/// <reference types="vite/client" />

import { FC } from "react";

declare global {
    type ModalFC<P extends object = object> = FC<{ onCancel?: () => void } & P>;
}
