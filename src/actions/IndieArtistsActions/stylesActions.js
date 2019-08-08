// INITIALIZE_STYLES
export const initializeIAStyles = (data) => ({
  type: "INITIALIZE_IA_STYLES",
  styles: data
});

export const handleUpdateStylesIA = (newStyleId) => ({
  type: "UPDATE_STYLES_IA",
  newStyleId
});
