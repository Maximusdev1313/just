import { defineStore } from 'pinia'
import axios from 'axios'
import { nextTick } from 'vue'
export const useCentralStore = defineStore('central', {
  state: () => ({
    products: JSON.parse(localStorage.getItem('products')) || [],
    items: [],
    itemsForSell: [],
    cartOpen: false,
    productsFromStorage: JSON.parse(localStorage.getItem('productsForSell')) || [],
    check: [],
    clients: []

  }),
  getters: {
    doubleCount: (state) => state.count * 2,
    filterItem: (state) => state.products.filter((item) => item.name == "Silver")
  },
  actions: {
    async getProductsFromServer() {
      try {
        const products = await axios.get('http://localhost:5000/api/products')
        this.products = products.data
        localStorage.setItem("products", JSON.stringify(products.data))
      } catch (error) {
        console.log(error);
      }
    },
    increment() {
      this.count++
    },
    filterProductsByName(name) {
      const filteredItem = this.products.filter(item => item.name.toLowerCase().includes(name.toLowerCase()));
      this.items = filteredItem.slice(-30)
      console.log(this.items);

      this.cartOpen = true
    },
    // filterProductsByCode(code) {
    //   this.items = this.products.filter(item => item.bar_code.toLowerCase().includes(code.toLowerCase()));
    //   console.log(this.items);
    // },
    addToCart(product) {
      if (!this.itemsForSell.some(i => i === product)) {
        const date = Date.now()
        console.log(date);
        product.created = date
        // this.itemsForSell.push(product)
        this.itemsForSell.unshift(product)
        product.quantity = ''

        this.cartOpen = false

      } else {
        product.quantity++
        this.cartOpen = false

      }
    },
    incrementQuantity(item) {
      parseFloat(item.quantity)
      item.quantity++
    },
    decrementQunatity(item) {
      if (item.quantity > 0) {
        item.quantity--;
        console.log('log');
      }
      else {
        return
      }
    },

    removeWords(word) {
      let strword = word.toString();
      console.log(word);
      strword = strword.slice(0, -1); // remove the last character
      let newWord = parseFloat(strword); // convert the string back to a wordber
      if (Number.isNaN(newWord)) {
        newWord = ''
      }
      return newWord;
    },

    incrementQuantityByKeypress(key, item) {
      console.log(key);
      if (key == 'ArrowUp') {
        item.quantity++
      }
      if (key == 'ArrowDown') {
        this.decrementQunatity(item.quantity);
      }
      if (!isNaN(key) || key == '.') {
        // If the key is a number or '.', append it to the current quantity
        item.quantity = item.quantity.toString() + key;
        parseFloat(item.quantity)
      }

      if (key == "Delete") {
        this.deleteProduct(item)
      }

    },

    deleteProduct(product) {
      let index = this.itemsForSell.indexOf(product)
      this.itemsForSell.splice(index, 1)
      console.log(this.itemsForSell);
    },
    sellProducts() {
      if (this.itemsForSell.length) {
        let item = []
        item = JSON.parse(localStorage.getItem('productsForSell')) || []
        item.unshift(this.itemsForSell)
        localStorage.setItem('productsForSell', JSON.stringify(item))
        this.getProductFromStorage()
        this.itemsForSell = []

      }



    },
    getProductFromStorage() {
      this.productsFromStorage = JSON.parse(localStorage.getItem("productsForSell"));
      console.log(this.productsFromStorage);
    },
    addClient(index) {
      if (this.itemsForSell.length) {

        let clients = JSON.parse(localStorage.getItem('clients')) || []
        clients.unshift(this.itemsForSell)
        localStorage.setItem('clients', JSON.stringify(clients))
        this.clients = JSON.parse(localStorage.getItem('clients'))
        console.log(clients);
        this.itemsForSell = []
      }
      else {
        alert("iltimos mahsulot qo'shing")
      }
    },
    getClients(index) {
      console.log(index);
      let client = this.clients[index]
      this.itemsForSell = []
      client.map((cli) => {
        this.itemsForSell.unshift(cli)
      })
    }
  },
})