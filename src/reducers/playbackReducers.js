let isPlayingDefaultState = false;

export default (state = isPlayingDefaultState, action) => {
 switch(action.type){
   case 'TOGGLE_PLAYBACK':
     return action.isPlaying;
   default:
     return state;
   }
};
