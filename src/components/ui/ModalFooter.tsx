import { PropsWithChildren } from 'react';

const ModalFooter = ({ children }: PropsWithChildren) => (
  <div className="sticky bottom-0 -mx-8 !-mb-8 flex justify-end gap-3 border-t border-gray-100 bg-white px-8 py-4">
    {children}
  </div>
);

export default ModalFooter;
