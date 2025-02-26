import ModalC from "@/components/ModalC/ModalC";
import { Button } from "antd";

import { FC } from "react";

interface ModalConfirmProps {
  title: string;
  button: React.ReactNode;
  callback: () => void;

}

const ModalConfirm: FC<ModalConfirmProps> = ({ button, callback, title }) => {
  return (
    <ModalC
      button={button}
      children={(action) => (
        <Confirm title={title} actions={action} callback={callback} />
      )}
    />
  );
};

const Confirm: FC<{
  title: string;
  actions: any;
  callback: () => void;
}> = ({ title, actions, callback }) => {
  return (
    <div className="h-[50px]">
      <p>{title}</p>
      <div className="flex justify-end mt-2 gap-3">
        <Button
          type="primary"
          onClick={() => {
            callback?.();
            actions.closeModal();
          }}
        >
          Yes
        </Button>
        <Button
          color="gold"
          onClick={() => {
            actions.closeModal();
          }}
        >
          No
        </Button>
      </div>
    </div>
  );
};
export default ModalConfirm;
