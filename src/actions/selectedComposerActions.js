// import { fetchBIcomposer } from './BackgroundInstrumentalsActions/composersActions';
import { fetchIAcomposer } from "./IndieArtistsActions/artistsActions";
// ==============================================================================================================
//  SELECTED COMPOSER ACTIONS
// ==============================================================================================================

export const initializeSelectedComposer = (selectedComposers) =>
  ({ type: "INITIALIZE_SELECTED_COMPOSER", selectedComposers });
