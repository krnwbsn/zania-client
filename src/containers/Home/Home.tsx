import { type FC, type ReactElement, memo } from 'react';
import { Box, Grid, GridItem, Image, VStack, Skeleton } from '@chakra-ui/react';

import Layout from 'components/Layout';
import Modal from 'components/Modal/Modal';
import useHomeAction from './Home.action';

import type { TDataManagement } from 'types/data-management';
import { imagePlacehoderUrl } from 'constants/url';

const Home: FC = (): ReactElement => {
  const {
    items,
    isFetching,
    handleDragStart,
    handleDragOver,
    handleDrop,
    handleCardClick,
    isOpen,
    onClose,
    selectedImage,
    placeholderItems,
  } = useHomeAction();

  return (
    <Layout>
      <Grid
        templateColumns="repeat(auto-fit, minmax(240px, 1fr))"
        gap={6}
        justifyContent="center"
      >
        {isFetching
          ? placeholderItems.map((phItem) => (
              <Skeleton
                height="290px"
                w="256px"
                borderRadius="8px"
                key={phItem}
              />
            ))
          : items.map((item: TDataManagement, index: number) => (
              <GridItem
                key={item.id}
                draggable
                onDragStart={() => handleDragStart(index)}
                onDragOver={handleDragOver}
                onDrop={() => handleDrop(index)}
                onClick={() => handleCardClick(item.imageUrl)}
                cursor="grab"
                p={2}
                border="1px solid #ccc"
                borderRadius="8px"
                w="256px"
                mx="auto"
              >
                <VStack gap={2}>
                  <Image
                    src={item.imageUrl}
                    alt={item.title}
                    h="240px"
                    w="100%"
                    objectFit="cover"
                    objectPosition="top"
                    borderRadius="6px"
                    loading="lazy"
                    fallbackSrc={imagePlacehoderUrl}
                  />
                  <Box>{item.title}</Box>
                </VStack>
              </GridItem>
            ))}
      </Grid>

      {selectedImage && (
        <Modal isOpen={isOpen} onClose={onClose}>
          <Image
            src={selectedImage}
            alt="Selected"
            loading="lazy"
            fallbackSrc={imagePlacehoderUrl}
          />
        </Modal>
      )}
    </Layout>
  );
};

export default memo(Home);
