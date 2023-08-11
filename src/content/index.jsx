import { runtime } from 'webextension-polyfill'

let count = 0

console.log('[content] loaded ')

window.addEventListener('click', ()=>{
    count++
    console.log('click(): ', count)

    runtime.sendMessage({ 
        from: 'content', 
        to: 'background', 
        action: 'click',
        data: {a:3, b: 5}
    })
});


var auto_play = () => {
    console.log('auto-play called')
    var timer = setInterval(()=>{
        var v = document.getElementsByTagName('video');
        console.log('check video element... r= ', v.length);
        if(!v.length) return;
        if(!document.getElementsByTagName('video')) return;

        document.getElementsByTagName('video')[0]?.setAttribute('loop', '1');
        document.getElementsByTagName('video')[0]?.play();
        document.getElementsByClassName('write-comment-camppro')[0]?.remove()
        clearInterval(timer);
    }, 500);

}

setTimeout(auto_play, 1000);


export {}