import { handleUpdateModal } from "./modalActions";

// INITIALIZE_RATINGS
export const initializeBIRatings = (ratings) => ({ type: "INITIALIZE_RATINGS", ratings });

export const handleSelectRating = (newRating) => {
  return function (dispatch, getState) {
    let selectedCue = getState().modal.selectedCue;
    let updatedCue = selectedCue.cue_rating !== newRating.value || selectedCue.cue_rating === 0
      ? { ...selectedCue, cue_rating: newRating.value }
      : { ...selectedCue, cue_rating: 0 };
    return dispatch(selectRating(newRating.value)) & dispatch(handleUpdateModal(updatedCue));
  };
};

const selectRating = (newRatingValue) => ({ type: "SET_RATING", newRatingValue });

// when the modal closes we want to turn all selected
// metadata to false so they don't appear highlighted when the
// user goes to edit the metadata of the next track.

export const clearRatings = () => ({ type: "CLEAR_RATING" });
