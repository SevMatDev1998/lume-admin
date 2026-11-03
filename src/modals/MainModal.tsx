import { AlertTriangle } from "lucide-react";
import { Button } from "../components/ui/Button";
import BlockContainer from "../containers/BlockContainer";

interface IMainModalProps {
  message?: string
  confirmText?: string
  onSubmit: () => void
}
const MainModal: ModalFC<IMainModalProps> = ({
  onSubmit,
  onCancel,
  message = "This action cannot be undone.",
  confirmText = "Delete",
}) => {
  return (
    <BlockContainer variant="8" className="!items-stretch space-y-6">
      <div className="flex flex-col items-center space-y-3 text-center">
        <span className="flex h-12 w-12 items-center justify-center rounded-full bg-red-50">
          <AlertTriangle className="h-5 w-5 text-red-600" />
        </span>
        <p className="text-sm text-gray-500">{message}</p>
      </div>
      <div className="flex justify-end space-x-3">
        <Button variant="secondary" onClick={onCancel}>Cancel</Button>
        <Button variant="dangerSolid" onClick={() => { onSubmit(); if (onCancel) onCancel() }}>
          {confirmText}
        </Button>
      </div>
    </BlockContainer>
  )
}
export default MainModal
