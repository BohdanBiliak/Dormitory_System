export interface MenuItem{
    id: string,
    label: string,
    image: string,
    href?: string,
    subMenu?: {
        id:string,
        label: string,
        image: string,
        href: string,
    }[]
}