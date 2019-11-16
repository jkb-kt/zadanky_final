import React, { useState } from 'react'

export const ModalContext = React.createContext()

export const ModalProvider = ({ children }) => {
  const [isOpened, toggleModal] = useState(false)
  return <ModalContext.Provider value={[isOpened, toggleModal]}>{children}</ModalContext.Provider>
}
