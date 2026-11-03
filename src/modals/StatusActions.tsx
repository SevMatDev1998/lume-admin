import toast from 'react-hot-toast';
import { Button } from '../components/ui/Button';
import ModalFooter from '../components/ui/ModalFooter';
import { errorMessage } from '../api/api';

interface IStatusActions<S extends string> {
  current: S;
  actions: { status: S; label: string; danger?: boolean }[];
  onChange: (status: S) => Promise<unknown>;
  onCancel?: () => void;
}

const StatusActions = <S extends string>({ current, actions, onChange, onCancel }: IStatusActions<S>) => {
  const handleChange = async (status: S) => {
    try {
      await onChange(status);
      toast.success('Status updated');
      onCancel?.();
    } catch (error) {
      toast.error(errorMessage(error));
    }
  };

  return (
    <ModalFooter>
      <Button variant="secondary" onClick={onCancel}>
        Close
      </Button>
      {actions
        .filter(({ status }) => status !== current)
        .map(({ status, label, danger }) => (
          <Button key={status} variant={danger ? 'danger' : 'primary'} onClick={() => handleChange(status)}>
            {label}
          </Button>
        ))}
    </ModalFooter>
  );
};

export default StatusActions;
