import { type FC, type ReactElement, memo } from 'react';
import { Container } from '@chakra-ui/react';

import type { TLayout } from './Layout.type';

const Layout: FC<TLayout> = ({ children }): ReactElement => (
  <Container maxW="container.lg" mt={4}>
    {children}
  </Container>
);

export default memo(Layout);
