declare namespace System {
  interface MenuItem {
    id: number
    component: string
    name: string
    path: string
    children?: Array<MenuItem>
  }
}
