import { MovieModal } from "components";
import { useState } from "react";

export const useModal = (movieID: number) => {
  const [showModal, setShowModal] = useState(false);

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const modal = (
    <MovieModal
      showModal={showModal}
      closeModal={closeModal}
      movieID={movieID}
    />
  );

  return { showModal, openModal, closeModal, modal };
};
