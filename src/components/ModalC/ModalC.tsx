import React, { useEffect, useState } from "react";
import { Button, Modal } from "antd";

interface ModalCProps {
  button: React.ReactNode;
  children: (action: any) => React.ReactNode;
  width?: number;
  title?: string;
}
const ModalC: React.FC<ModalCProps> = ({
  button,
  children,
  width = 600,
  title,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const isFirstMount = React.useRef(true);
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const actions = {
    closeModal: handleCancel,
  };

  useEffect(() => {
    if (isFirstMount.current) {
      isFirstMount.current = false;
      return;
    }
  }, [open]);

  return (
    <>
      <div className="inline" onClick={showModal}>
        {button}
      </div>
        {
          isModalOpen && (
            <Modal
            width={width}
            onCancel={handleCancel}
            title={title}
            open={true}
            footer={false}
          >
            {children(actions)}
          </Modal>
          )
        }
    </>
  );
};

export default ModalC;
