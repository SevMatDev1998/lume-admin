import { LogOut } from "lucide-react";
import { Button } from "../components/ui/Button";
import BlockContainer from "../containers/BlockContainer";

interface ISignOutModalProps {
  onSubmit: () => void
}
const SignOutModal: ModalFC<ISignOutModalProps> = ({ onSubmit, onCancel }) => {
  return (
    <BlockContainer variant="8" className="!items-stretch space-y-6">
      <div className="flex flex-col items-center space-y-3 text-center">
        <span className="flex h-12 w-12 items-center justify-center rounded-full bg-alice-blue">
          <LogOut className="h-5 w-5 text-bice-blue" />
        </span>
        <p className="text-base font-semibold text-gray-900">You are about to be signed out</p>
        <p className="text-sm text-gray-500">Are you sure you want to sign out?</p>
      </div>
      <div className="flex justify-end space-x-3">
        <Button variant="secondary" onClick={onCancel}>Cancel</Button>
        <Button onClick={() => { onSubmit(); if (onCancel) onCancel() }}>Sign out</Button>
      </div>
    </BlockContainer>
  )
}
export default SignOutModal
