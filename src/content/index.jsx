import { runtime } from 'webextension-polyfill'
import playNextVideo from './PlayNextVideo';

let count = 0

console.log('[content] loaded ')

// window.addEventListener('click', ()=>{
//     count++
//     console.log('click(): ', count)

//     runtime.sendMessage({ 
//         from: 'content', 
//         to: 'background', 
//         action: 'click',
//         data: {a:3, b: 5}
//     })
// });

window.onload = ()=>{
    console.log('[content] onload2222')

    var checkLoad = () => {
        console.log('checkLoad called')
        var timer = setInterval(()=>{
            var v = document.querySelector('.content_switch_tab');
            console.log('check .content_switch_tab element... r= ', v);
            if(!v) return;    
            playNextVideo();
            clearInterval(timer);
        }, 500);
    
    }
    
    setTimeout(checkLoad, 1000);

    
}


export {}