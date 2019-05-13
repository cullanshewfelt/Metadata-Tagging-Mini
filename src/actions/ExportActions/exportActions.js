
// ==============================================================================================================
//  Export ACTIONS
// ==============================================================================================================

// Download Progress
export const resetDownload = () => ({
    type: 'RESET_DL_PROGRESS',
    downloadProgress: (0).toFixed(2)
});

export const updateDownload = (downloadProgress) => ({
    type: 'UPDATE_DL_PROGRESS',
    downloadProgress: (downloadProgress * 100).toFixed(2)
});
