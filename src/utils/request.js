// 封装通用的调用接口

const request = (path) => {
    const url = 'https://www.ehomespace.com/api/public/v1/' + path;
    return new Promise(function (resolve){
        // 实现接口调用
        wx.request({
            url : url,
            method : 'get',
            success : res => {
                resolve(res)
            }
        })
    })
}

export default request;