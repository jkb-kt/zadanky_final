import { Modal } from 'antd'
import React from 'react'

export default ({ message, title, toggleModal, isOpened, action }) => {
  const handleOk = e => {
    action()
    toggleModal(!isOpened)
  }

  const handleCancel = e => {
    toggleModal(!isOpened)
  }

  return (
    <Modal
      title={title}
      visible={isOpened}
      onOk={handleOk}
      onCancel={handleCancel}
      cancelText="Zpět"
      maskStyle={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
    >
      <p>{message}</p>
    </Modal>
  )
}
