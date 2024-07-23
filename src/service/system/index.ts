import { request } from '@/utils/request'

export const getMenu = (params: { clientId: string; userId: string }) => {
  return request<System.MenuItem[]>({
    method: 'GET',
    url: 'exposure/menuPermissionInfo',
    params
  })
}
