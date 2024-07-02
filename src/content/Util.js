
export const getFriendTime = (timestamp) => {
    // 创建 Date 对象
    const date = new Date(timestamp);
    
    // 提取年、月、日、小时、分钟、秒
    const year = date.getFullYear();
    const month = date.getMonth() + 1; // 月份从0开始，需要加1
    const day = date.getDate();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();
    
    // 格式化为两位数
    const formattedMonth = month < 10 ? '0' + month : month;
    const formattedDay = day < 10 ? '0' + day : day;
    const formattedHours = hours < 10 ? '0' + hours : hours;
    const formattedMinutes = minutes < 10 ? '0' + minutes : minutes;
    const formattedSeconds = seconds < 10 ? '0' + seconds : seconds;
    
    // 组合为友好的日期时间格式
    const friendlyDateTime = `${formattedMonth}/${formattedDay} ${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
    
    // console.log('友好显示的日期时间：', friendlyDateTime);
    return friendlyDateTime;
}