import { request } from '@/utils/request'

export const testReqGet = () => {
  return request<User.Test>({
    method: 'GET',
    url: '/userInfo'
  })
}
