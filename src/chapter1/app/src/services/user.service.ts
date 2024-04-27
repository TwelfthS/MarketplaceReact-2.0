import axios, { AxiosResponse } from 'axios'
import authHeader from './auth-header'
import { Item, ItemCart, Order } from '../types'

const API_URL = 'http://localhost:8000/'

class UserService {
    async GetProducts() {
        const response: AxiosResponse<Item[]> = await axios.get(API_URL)
        return response.data
    }

    async GetProduct(itemId: number) {
        const response: AxiosResponse<Item> = await axios.get(API_URL + "products/" + itemId)
        return response.data
    }

    async getCart() {
        const response: AxiosResponse<ItemCart[]> = await axios.get(API_URL + "cart/", { headers: authHeader() })
        return response.data
    }

    async getMyOrders() {
        const response: AxiosResponse<Order[]> = await axios.get(API_URL + "my-orders/", { headers: authHeader() })
        return response.data
    }

    async createOrder(items: Item[]) {
        const response: AxiosResponse<Order> = await axios.post(API_URL + "my-orders/", {items}, { headers: authHeader() })
        return response.data
    }

    async addCart(itemId: number) {
        await axios.post(API_URL + "cart/", { itemId }, { headers: authHeader() })
    }

    async addItem(itemId: number, change: number | string) {
        await axios.put(API_URL + "cart/", { itemId, change }, {headers: authHeader() })
    }
}

const userService = new UserService()

export default userService