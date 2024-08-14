declare namespace System {
  interface MenuItem {
    id: number
    component: string
    hidden: boolean
    name: string
    path: string
    meta: {
      title: string
      icon: string
    }
    children: Array<MenuItem>
  }
}
