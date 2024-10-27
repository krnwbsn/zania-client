import { Box, Progress } from '@chakra-ui/react';
import { memo } from 'react';

const ProgressBar = () => (
  <Box
    pos="fixed"
    top={0}
    left={0}
    w="100vw"
    h="100vh"
    bgColor="rgba(0, 0, 0, 0.3)"
    zIndex={999}
  >
    <Progress size="xs" isIndeterminate />
  </Box>
);

export default memo(ProgressBar);
