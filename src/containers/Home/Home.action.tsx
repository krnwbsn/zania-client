import { useState } from 'react';
import { useDisclosure, useToast } from '@chakra-ui/react';
import { useMutation, useQuery } from '@tanstack/react-query';

import {
  GetDataManagementListApi,
  UpdateSequenceDataManagementApi,
} from 'api/data-management';
import { showToast } from 'context/toast';
import useInterval from 'hooks/useInterval';

import type { TDataManagement } from 'types/data-management';

const useHomeAction = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [draggedItemIndex, setDraggedItemIndex] = useState<number | null>(null);
  const [items, setItems] = useState<TDataManagement[]>([]);
  const [hasChanges, setHasChanges] = useState(false);

  const { isFetching } = useQuery(['getDataManagementsApi'], () =>
    GetDataManagementListApi()
      .then((resp) => {
        const { data } = resp?.data ?? {};
        setItems(data ?? []);
        return data;
      })
      .catch(() => {
        setItems([]);
        showToast(toast, 'Failed to fetch data management', 'error');
        return [];
      })
  );

  const { mutate: updateSequence } = useMutation({
    mutationFn: (payload: Array<Pick<TDataManagement, 'id' | 'position'>>) =>
      UpdateSequenceDataManagementApi(payload),
    onSuccess: () => {
      setHasChanges(false);
    },
    onError: () => {
      showToast(toast, 'Failed to update sequence', 'error');
    },
  });

  const updateSequenceHandler = () => {
    const payload = items.map(({ id, position }) => ({
      id,
      position,
    }));
    updateSequence(payload);
  };

  useInterval(
    () => {
      if (hasChanges) {
        updateSequenceHandler();
      }
    },
    hasChanges ? 5000 : null
  );

  const handleDragStart = (index: number) => {
    setDraggedItemIndex(index);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDrop = (index: number) => {
    if (draggedItemIndex === null) return;

    const reorderedItems = [...items];
    const [draggedItem] = reorderedItems.splice(draggedItemIndex, 1);
    reorderedItems.splice(index, 0, draggedItem);

    const updatedItems = reorderedItems.map((item, newIndex) => ({
      ...item,
      position: newIndex,
    }));

    setItems(updatedItems);
    setDraggedItemIndex(null);
    setHasChanges(true);
  };

  const handleCardClick = (imageUrl: string) => {
    setSelectedImage(imageUrl);
    onOpen();
    setHasChanges(true);
  };

  const placeholderItems = Array.from({ length: 6 }, (_, i) => i);

  return {
    isFetching,
    handleDragStart,
    handleDragOver,
    handleDrop,
    handleCardClick,
    selectedImage,
    isOpen,
    onClose,
    items,
    placeholderItems,
  };
};

export default useHomeAction;
