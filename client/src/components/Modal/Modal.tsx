import { RecipeCard } from 'components/RecipeCard/RecipeCard';
import { Food } from 'hooks/useFetch';
import { useEffect, useRef } from 'react';

interface RecipeModalProps {
  openModal: boolean;
  closeModal: () => void;
  content: Food;
}

export const RecipeModal = ({
  openModal,
  closeModal,
  content,
}: RecipeModalProps) => {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (openModal) {
      ref.current?.showModal();
    } else {
      ref.current?.close();
    }
  }, [openModal]);

  return (
    <dialog ref={ref} onCancel={closeModal}>
      <RecipeCard food={content} />
      <button onClick={closeModal}>Close</button>
    </dialog>
  );
};
