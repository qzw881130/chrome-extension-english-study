import { getBrowser, getFriendTime } from "./Util";
import { _playNextVideo, clearCache, getFullScreenState, handleFullscreen, setFullScreenState, setPlaybackRate} from "./Event";

const createFloatElem = () => {
    const floatElem = document.createElement('div');
    floatElem.setAttribute('id', 'float-elem')
    const target = document.getElementsByClassName('shop_msg')[0]
    const otop = target.offsetTop;
    const oright = target.offsetLeft
    floatElem.setAttribute('style', `border-radius: 5px; position: absolute; top: ${otop}px; left: ${oright}px; background-color: #fff; z-index:99999; padding: 10px; border: 1px darkgrey solid;`)
    return floatElem;
}

const createPlayNextVideoBtn = () => {
    const btn = document.createElement('Button');
    btn.setAttribute('id', 'play-next-video')
    btn.setAttribute('style', `font-size:16pt; padding: 5px; color: #ffff00; background-color: #000; border-radius: 5px; cursor: pointer`);
    btn.innerHTML = 'Play Next [shift+p]';
    btn.addEventListener('click', async ()=>{
         console.log('hi, click')
         await _playNextVideo();
     })
    return btn;
}

const createPlayRateBtn = () => {
    const rates = ['0.5', '0.75', '1'];
    const pElem = document.createElement('p');
    pElem.setAttribute('style', `display:flex; flex-direction: row; gap:5px; margin: 8px 0px; `);
    rates.map(rate => {
        const rateBtn = document.createElement('Button');
        rateBtn.setAttribute('id', `play-next-video-${rate}`);
        rateBtn.setAttribute('style', `font-size:16pt; padding: 5px; color: #ffff00; background-color: #000; border-radius: 5px; cursor: pointer`);
        rateBtn.innerHTML = `${rate}x`;
        rateBtn.addEventListener('click', () => {
            setPlaybackRate(rate);
            rates.map(r => {
                if(r !== rate){
                    document.getElementById(`play-next-video-${r}`).style.backgroundColor = '#000';
                    document.getElementById(`play-next-video-${r}`).style.color = '#ffff00';
                }else{
                    document.getElementById(`play-next-video-${r}`).style.backgroundColor = '#ffff00';
                    document.getElementById(`play-next-video-${r}`).style.color = '#000';
                }
                

            })
        })
        pElem.appendChild(rateBtn);
    })
    return pElem;
}

const createClearCacheBtn = () => {
    const clearCacheBtn = document.createElement('Button');
    clearCacheBtn.setAttribute('id', 'clear-cache')
    clearCacheBtn.setAttribute('style', `font-size:16pt; padding: 5px; color: #ffff00; background-color: #000; border-radius: 5px; cursor: pointer`);
    clearCacheBtn.innerHTML = 'Flush Cache';
    clearCacheBtn.addEventListener('click', clearCache)
    return clearCacheBtn;
}

const createCacheTip = () => {
    const p3Elem = document.createElement('p');
    let lastUpdateAt = parseFloat(localStorage.getItem('block-list-last-update-at')) || 0;
    p3Elem.style = `margin: 0px;`;
    p3Elem.innerHTML = `Last cache updated at: ${lastUpdateAt ? getFriendTime(lastUpdateAt) : '-'}`;
    return p3Elem;
}

const createAutoFullScreenBtn = () => {
    const p4Elem = document.createElement('p');
    const checkElem = document.createElement('input');
    p4Elem.style = `margin: 5px 0px 0px 0px;`
    checkElem.setAttribute('type', 'checkbox');
    checkElem.setAttribute('id', 'auto-full-screen');
    if(getFullScreenState()) checkElem.setAttribute('checked', 'checked');
    checkElem.addEventListener('change', (e)=>{
        console.log('auto-full-screen e.target.checked==', e.target.checked)
        setFullScreenState(e.target.checked);
        handleFullscreen();
    })

    
    p4Elem.appendChild(checkElem)
    p4Elem.appendChild(document.createTextNode('Auto Full Screen'));
    return p4Elem;
}

const createCloseBtn = () => {
    const spanElem = document.createElement('span');
    spanElem.innerHTML = '&times;';
    const topv = getBrowser() == 'chrome' ? '-6' : '2';
    spanElem.setAttribute('style', `font-size:14pt; color: gray; cursor: pointer; position: absolute; top: ${topv}px; right: 5px;`);
    spanElem.addEventListener('click', ()=>{
        document.getElementById('float-elem').remove();
    })
    return spanElem;
}

const createVersion = () => {
    console.log('create version', chrome.runtime.getManifest()?.version)
    const aElem = document.createElement('a');
    aElem.setAttribute('href', `https://note.youdao.com/ynoteshare/index.html?id=ed33f18348fc140d0d918e3b1528f371&type=note&_time=1719708900636`);
    aElem.setAttribute('target', '_blank');
    aElem.setAttribute('style', `font-size:12pt; cursor: pointer; position: absolute; right: 9px; bottom: 5px;`);
    aElem.setAttribute('id', 'version');
    aElem.innerText = 'check version';

    var timer = setInterval(()=>{
        try{
            const version = chrome.runtime.getManifest()?.version
            document.getElementById('version').innerText = `v${version}`;
            clearInterval(timer);
        }catch(e){
            console.log('getVersion error', e);
        }      
    }, 1000);

    return aElem;
}

export const Panel = ()=>{
    //panel
    const floatElem = createFloatElem();
    document.body.appendChild(floatElem);

    //play next video
    const btn = createPlayNextVideoBtn();
    floatElem.appendChild(btn);

    //play rate
    const pElem = createPlayRateBtn();
    floatElem.appendChild(pElem);

    //clear cache
    const clearCacheBtn = createClearCacheBtn();
    floatElem.appendChild(clearCacheBtn);

    //cache tip
    const p3Elem = createCacheTip();
    floatElem.appendChild(p3Elem);

    //auto full screen
    const p4Elem = createAutoFullScreenBtn();
    floatElem.appendChild(p4Elem);

     //close btn
    const spanElem = createCloseBtn();
     floatElem.appendChild(spanElem);
     
    const aElem = createVersion();
    floatElem.appendChild(aElem);
}