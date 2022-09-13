
const responseReturn = {
  success: ({data: data,message: message},count) =>
  {
    const response = {
      meta: {
        code: 200,
        message: message,
        status: 'success'
      },
      data: data,
      count: count ?? {},
    }
    return response;
  },
  error: ({message: message,code: c,data: data},count = null) =>
  {
    const code = c || 500;
    const status = code === 404 ? 'not found' : 'error';
    const response = {
      meta: {
        code: code,
        message: message,
        status: status
      }
      ,
      data: data ?? {},
      count: count ?? null
    }
    return response;
  }
}

module.exports = responseReturn;