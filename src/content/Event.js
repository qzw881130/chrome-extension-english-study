import { getBlockItemList, getBlockList, getInfo } from "./Api";

export const switchMenu = ()=>{
    document.querySelector('.content_switch_tab').querySelectorAll('li.tabs-item')[1].click()
}
export const keepSort = ()=>{
  if(!!document.getElementsByClassName('sort_text')) return;
  if(!document.getElementsByClassName('sort_text')[0].innerText.includes('正序')) document.getElementsByClassName('sort_text')[0].click();
  document.getElementsByClassName('sort_box')[0].remove()
}

export const setPlaybackRate = (rate) => {
    const rateMap = {'0.5': 6, '0.75': 5, '1': 4};
    if(!rateMap[rate]) return;
    const idx = rateMap[rate];
    document.getElementsByClassName('xgplayer-playbackrate')[0].querySelectorAll('li')[idx].click()
}

export const getPlaybackRate = () => {
    const video = document.getElementsByTagName('video')[0];
    return video?.playbackRate || 'undefined';
}


export const clearCache = () => {
    localStorage.removeItem('block-list');
    localStorage.removeItem('block-list-last-update-at');
}

export const setFullScreenState = (state) => {
    localStorage.setItem('full-screen', state);
}
export const getFullScreenState = () => {
    return localStorage.getItem('full-screen') === 'true';
}

export const setRateBtnState = ()=>{
    setTimeout(()=>{
        const rate = getPlaybackRate();
        console.log('rate=====', rate)
        const rateBtn = document.getElementById(`play-next-video-${rate}`);
        if(rateBtn){
            rateBtn.style.backgroundColor = '#ffff00';
            rateBtn.style.color = '#000';
        }                
    }, 1000);
}


export const bindShortcut = ()=>{
    document.addEventListener('keydown', (e)=>{
     console.log(e)
        if(e.shiftKey && e.key === 'P'){
            console.log('shift + p')
            _playNextVideo();
        }
    })
}

export const handleFullscreen = () => {
     document.getElementsByClassName('xgplayer-cssfullscreen')[0].click()
}


export const _playNextVideo = async ()=>{
    const paths = document.location.pathname.split('/')
    const resource_id = paths.pop();
    const info = await getInfo(resource_id);
    const {course_id, app_id, chapter_id, p_id} = info;

    
    let blockList = localStorage.getItem('block-list');
    let lastUpdateAt = parseFloat(localStorage.getItem('block-list-last-update-at'));
    if(!blockList || !lastUpdateAt || lastUpdateAt + 1000*20*60 < Date.now()){
        blockList = await getBlockList(app_id);
        localStorage.setItem('block-list', JSON.stringify(blockList));
        localStorage.setItem('block-list-last-update-at', Date.now());
    }else{
        blockList = JSON.parse(blockList);
    }
    blockList.sort((a, b)=>a.sort_value - b.sort_value);
    console.log('blockList===', blockList)
    console.log('block-list count=', blockList.length)



    const blockItems = await getBlockItemList({app_id, course_id, chapter_id:p_id});
    
    console.log(`blockItems====`, blockItems);
    blockItems.sort((a, b)=>a.sort_c - b.sort_c);
    console.log(`after sort blockItems====`, blockItems);

    const idx = blockItems.findIndex(item=>item.chapter_id == chapter_id);
    console.log('idx====', idx);
    if(idx < blockItems.length - 1){
        const next = blockItems[idx + 1];
        console.log(next)
        const url = `/p/t_pc/course_pc_detail/video/${next.chapter_id}?product_id=${next.course_id}`
        console.log('url===', url)
        window.location.href = url;
    }else{
        const bidx = blockList.findIndex(item=>item.chapter_id == p_id);
        console.log('block bidx===', bidx)
        if(bidx < blockList.length - 1){
            const nextBlock = blockList[bidx + 1];
            const blockItems = await getBlockItemList({app_id, course_id, chapter_id:nextBlock.chapter_id});
            blockItems.sort((a, b)=>a.sort_c - b.sort_c);
            console.log('next blockItems==', blockItems)
            const next = blockItems[0];
            const url = `/p/t_pc/course_pc_detail/video/${next.chapter_id}?product_id=${next.course_id}`
            console.log('new block ->url===', url)
            window.location.href = url;
        }else{
            alert('This is the last video in this course');
        }
    }        
}