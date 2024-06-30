const playNextVideo = ()=>{
    try{
        const switchMenu = ()=>{
            document.querySelector('.content_switch_tab').querySelectorAll('li.tabs-item')[1].click()
        }
       const keepSort = ()=>{
          if(!!document.getElementsByClassName('sort_text')) return;
          if(!document.getElementsByClassName('sort_text')[0].innerText.includes('正序')) document.getElementsByClassName('sort_text')[0].click();
          document.getElementsByClassName('sort_box')[0].remove()
       }

        const setPlaybackRate = (rate) => {
            const rateMap = {'0.5': 6, '0.75': 5, '1': 4};
            if(!rateMap[rate]) return;
            const idx = rateMap[rate];
            document.getElementsByClassName('xgplayer-playbackrate')[0].querySelectorAll('li')[idx].click()
        }

        const getPlaybackRate = () => {
            const video = document.getElementsByTagName('video')[0];
            return video?.playbackRate || 'undefined';
        }
    
       const addBtn = ()=>{
           const floatElem = document.createElement('div');
           const target = document.getElementsByClassName('shop_msg')[0]
           const otop = target.offsetTop;
           const oright = target.offsetLeft + parseInt(window.getComputedStyle(target).width) + 10;
           floatElem.setAttribute('style', `border-radius: 5px; position: absolute; top: ${otop}px; left: ${oright}px; background-color: #fff; z-index:99999; padding: 10px;`)
           document.body.appendChild(floatElem);

           let btn = document.createElement('Button');
           btn.setAttribute('id', 'play-next-video')
           btn.setAttribute('style', `font-size:20pt; padding: 5px; color: #ffff00; background-color: #000; border-radius: 5px; cursor: pointer`);
           btn.innerHTML = 'Play Next [shift+p]';
           btn.addEventListener('click', async ()=>{
                console.log('hi, click')
                await _playNextVideo();
            })
            floatElem.appendChild(btn);

            const rates = ['0.5', '0.75', '1'];
            const pElem = document.createElement('p');
            pElem.setAttribute('style', `display:flex; flex-direction: row; gap:5px; `);
            rates.map(rate => {
                const rateBtn = document.createElement('Button');
                rateBtn.setAttribute('id', `play-next-video-${rate}`);
                rateBtn.setAttribute('style', `font-size:16pt; padding: 5px; color: #ffff00; background-color: #000; border-radius: 5px; margin-top: 25px; cursor: pointer`);
                rateBtn.innerHTML = `${rate}x`;
                rateBtn.addEventListener('click', () => {
                    setPlaybackRate(rate);
                    document.getElementById('current-play-rate').innerText = `Current Rate: ${getPlaybackRate()}x`;
                })
                pElem.appendChild(rateBtn);
            })
            floatElem.appendChild(pElem);
            const p2Elem = document.createElement('p');
            p2Elem.setAttribute('id', 'current-play-rate')
            p2Elem.setAttribute('style', `display:flex; flex-direction: row; gap:5px; `);
            p2Elem.innerHTML = `Current Rate: ${getPlaybackRate()}x`;
            floatElem.appendChild(p2Elem)
       }

       const bindShortcut = ()=>{
           document.addEventListener('keydown', (e)=>{
            console.log(e)
               if(e.shiftKey && e.key === 'P'){
                   console.log('shift + p')
                   _playNextVideo();
               }
           })
       }
    
        const getBlockList = async (app_id)=>{
            const resp = await fetch("/xe.course.business.avoidlogin.e_course.resource_catalog_list.get/1.0.0", {
              "headers": {
                "accept": "application/json, text/plain, */*",
                "accept-language": "en-US,en-GB;q=0.9,en;q=0.8,zh-CN;q=0.7,zh;q=0.6,tr;q=0.5",
                "content-type": "application/x-www-form-urlencoded"
              },
            
              "body": `app_id=${app_id}&course_id=course_2bc618KiM2ikYueyikGr1ZE5XOA&order=desc&p_id=0&page=1&page_size=500&resource_id=`,
              "method": "POST"
            });
            const res = await resp.json();
            console.log(res.data.list)
            return res.data.list;
        }
        const getBlockItemList = async ({app_id, course_id, chapter_id})=>{
            console.log(`app_id, course_id, chapter_id===`, app_id, course_id, chapter_id)
    
            const resp = await fetch("/xe.course.business.avoidlogin.e_course.resource_catalog_list.get/1.0.0", {
              "headers": {
                "accept": "application/json, text/plain, */*",
                "accept-language": "en-US,en-GB;q=0.9,en;q=0.8,zh-CN;q=0.7,zh;q=0.6,tr;q=0.5",
                "content-type": "application/x-www-form-urlencoded"
              },
             "body": `app_id=${app_id}&resource_id=&course_id=${course_id}&p_id=${chapter_id}&order=desc&page=1&page_size=50&sub_course_id=`,
              "method": "POST"
            });
            const res = await resp.json();
            console.log(res.data.list)
            return res.data.list;
        }
    
        const getInfo = async (resource_id)=>{
            const resp = await fetch("/xe.course.business.parent.info.get/2.0.0", {
              "headers": {
                "accept": "application/json, text/plain, */*",
                "accept-language": "en-US,en-GB;q=0.9,en;q=0.8,zh-CN;q=0.7,zh;q=0.6,tr;q=0.5",
                "content-type": "application/x-www-form-urlencoded"
              },
              "body": `resource_id=${resource_id}&parent_state=0`,
              "method": "POST"
            });
            const res = await resp.json();
            console.log(res.data)
            return res.data.parent_columns[0]
        }
    
        const _playNextVideo = async ()=>{
            const paths = document.location.pathname.split('/')
            const resource_id = paths.pop();
            const info = await getInfo(resource_id);
            const {course_id, app_id, chapter_id, p_id} = info;
    
            
            let blockList = localStorage.getItem('block-list');
            if(!blockList){
                blockList = await getBlockList(app_id);
                localStorage.setItem('block-list', JSON.stringify(blockList));
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
                }
            }        
        }
        switchMenu();
        keepSort();
        addBtn();
        bindShortcut();
        
    }catch(e){
        console.warn('play next-video error===', e);
    }    
}

// module.exports = playNextVideo;
export default playNextVideo;