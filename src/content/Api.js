
export const getBlockList = async (app_id, course_id)=>{
    const resp = await fetch("/xe.course.business.avoidlogin.e_course.resource_catalog_list.get/1.0.0", {
      "headers": {
        "accept": "application/json, text/plain, */*",
        "accept-language": "en-US,en-GB;q=0.9,en;q=0.8,zh-CN;q=0.7,zh;q=0.6,tr;q=0.5",
        "content-type": "application/x-www-form-urlencoded"
      },
    
      "body": `app_id=${app_id}&course_id=${course_id}&order=desc&p_id=0&page=1&page_size=500&resource_id=`,
      "method": "POST"
    });
    const res = await resp.json();
    console.log(res.data.list)
    return res.data.list;
}
export const getBlockItemList = async ({app_id, course_id, chapter_id})=>{
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

export const getInfo = async (resource_id)=>{
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