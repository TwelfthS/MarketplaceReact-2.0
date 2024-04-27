export type User = {
    id: number,
    username: string,
    accessToken: string
}

export type Item = {
    id: number,
    name: string,
    description: string,
    price: number,
    image: string,
    createdAt: Date,
    OrderItem: OrderItem
}

export type ItemCart = Item & {Cart: Cart}

export type Order = {
    id: number,
    userId: number,
    address: string,
    date: string,
    cost: number,
    createdAt: Date,
    orderedItem: Item[],
    OrderItem: OrderItem
}

type OrderItem = {
    itemId: number,
    orderId: number,
    quantity: number
}

export type Cart = {
    itemId: number,
    userId: number,
    quantity: number
}

export type AxiosErrorResponseData = {
    message: string
}