export interface RouterItem {
  element: React.ReactNode
  id: number
  path: string
  meta: {
    title: string
    icon: string
  }
  children: RouterItem[]
}
