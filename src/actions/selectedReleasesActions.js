
// ==============================================================================================================
//  SELECTED RELEASES ACTIONS
// ==============================================================================================================

export const initializeSelectedReleases = (data) => {
    return ({
    type: 'INITIALIZE_SELECTED_RELEASES',
    selectedReleases: data
    })
}
