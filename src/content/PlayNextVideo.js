import { _playNextVideo, bindShortcut, getFullScreenState, handleFullscreen, keepSort, setRateBtnState, switchMenu, checkVideoPlayState } from "./Event";
import { Panel } from "./Panel";

const playNextVideo = ()=>{
    try{
        switchMenu();
        keepSort();
        Panel();
        bindShortcut();
        if(getFullScreenState()) handleFullscreen();
        // setRateBtnState();
        checkVideoPlayState(setRateBtnState);
    }catch(e){
        console.warn('play next-video error===', e);
    }    
}

export default playNextVideo;