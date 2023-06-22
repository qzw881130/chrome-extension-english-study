// document.body.style.backgroundColor = "orange";

console.log('english study');

var auto_play = () => {
    console.log('auto-play called')
    var timer = setInterval(()=>{
        var v = document.getElementsByTagName('video');
        console.log('check video element... r= ', v.length);
        if(!v.length) return;

        document.getElementsByTagName('video')[0].setAttribute('loop', '1');
        document.getElementsByTagName('video')[0].play();
        document.getElementsByClassName('write-comment-camppro')[0]?.remove()
        clearInterval(timer);
    }, 500);

}

setTimeout(auto_play, 1000);