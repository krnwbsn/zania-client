import { type FC, type ReactElement, memo } from 'react';
import {
  Modal as ModalComponent,
  ModalOverlay,
  ModalContent,
} from '@chakra-ui/react';

import type { TModal } from './Modal.type';

const Modal: FC<TModal> = ({ isOpen, onClose, children }): ReactElement => (
  <ModalComponent isOpen={isOpen} onClose={onClose}>
    <ModalOverlay />
    <ModalContent>{children}</ModalContent>
  </ModalComponent>
);

export default memo(Modal);
