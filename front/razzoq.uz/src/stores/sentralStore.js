import { defineStore } from 'pinia'
import axios from 'axios'
import { nextTick, onMounted } from 'vue'
// import VueCookies from "vue-cookies";
// import { format } from "date-fns";

export const useCentralStore = defineStore('central', {
    state: () => ({
        api: 'https://justserv.netlify.app/.netlify/functions/app/api',
        products: JSON.parse(sessionStorage.getItem("products")) || [],
        cartItems: JSON.parse(localStorage.getItem("cart_items")) || [],
        client: [],
        clientId: JSON.parse(localStorage.getItem("clientId")) || [],
        changed: '',
        filteredItem: [],
        searchName: '',
        isLoading: false
    }),
    getters: {
        subTotal: state => state.cartItems.reduce((total, item) => total + item.quantity * item.price, 0),
        lastProducts: state => state.products.slice(-18).reverse(),
        flour: state => state.products.filter(product => product.category == 'Un mahsulotlari').reverse(),
        sausage: state => state.products.filter(product => product.category == 'Kolbasa').reverse(),
        oil: state => state.products.filter(product => product.category == "Yog' mahsulotlari").reverse(),
        water: state => state.products.filter(product => product.category == 'Suvlar').reverse(),
        important: state => state.products.filter(product => product.status == 'Important').reverse(),
    },
    actions: {
        async getProducts() {
            console.log('get');
            try {
                const response = await axios.get(this.api + '/products')
                this.products = response.data
                this.products = this.filterItems(this.products, 'market_name', 'Razzoq market')
                sessionStorage.setItem("products", JSON.stringify(this.products))
                console.log(this.products);
            } catch (error) {
                console.log(error.message);
            }
        },
        filterItems(items, value, condition) {
            return items.filter((item) => item[value] === condition)
        },

        addProductToCart(product) {
            // Check if the product already exists in the cart
            let existingProduct = this.cartItems.find(item => item._id === product._id);
            if (existingProduct) {
                // If the product exists, update the quantity
                existingProduct.quantity += 1;
            } else {
                // If the product doesn't exist, add it to the cart
                // Assuming product object has a quantity property
                product.quantity = 1;
                this.cartItems.unshift(product);
            }
            // Update the quantity in lastProducts
            let lastProduct = this.lastProducts.find(item => item._id === product._id);
            if (lastProduct) {
                lastProduct.quantity = product.quantity;
            }
            localStorage.setItem("cart_items", JSON.stringify(this.cartItems));
        },
        removeProduct(product) {
            // Find the index of the product and remove
            const index = this.cartItems.indexOf(product);
            if (index > -1) {
                this.cartItems.splice(index, 1);
            }
            // Update the quantity in lastProducts
            let lastProduct = this.lastProducts.find(item => item._id === product._id);
            if (lastProduct) {
                lastProduct.quantity = 0; // Set quantity to 0 since the product is removed from the cart
            }
            localStorage.setItem('cart_items', JSON.stringify(this.cartItems));
        },
        async getClientInfo() {
            this.isLoading = true
            for (let client of this.clientId) {
                console.log(client);
                try {
                    let res = await axios.get(this.api + '/orders/' + client)
                    this.client.push(res.data)
                    console.log(this.client[0]);

                }
                catch (err) {
                    this.isLoading = false
                }
            }
            this.isLoading = false
        },
        searchProducts(name) {
            this.filteredItem = this.products.filter(product => {

                return product?.name.toLowerCase().includes(name.toLowerCase())
            })
            this.filteredItem = this.filteredItem.slice(-10)
            console.log(this.filteredItem)

        }




    },



})