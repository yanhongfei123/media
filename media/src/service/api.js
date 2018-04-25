import request from './request';

export function formSubmit(url,formData) {
    return request({
      url ,
      method: 'post',
      data:formData
    })
  }

