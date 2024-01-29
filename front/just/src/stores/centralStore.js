import { defineStore } from 'pinia'
import axios from 'axios'
import { nextTick } from 'vue'
import VueCookies from "vue-cookies";

export const useCentralStore = defineStore('central', {
  state: () => ({
    api: 'http://localhost:5000/api',
    products: JSON.parse(localStorage.getItem('products')) || [],
    items: [],
    itemsForSell: [],
    cartOpen: false,
    productsFromStorage: JSON.parse(localStorage.getItem('productsForSell')) || [],
    check: [],
    clients: JSON.parse(localStorage.getItem('clients')) || [],
    clientIndex: 0
  }),
  getters: {
    doubleCount: (state) => state.count * 2,
    filterItem: (state) => state.products.filter((item) => item.name == "Silver")
  },
  actions: {
    async getProductsFromServer() {
      try {
        const products = await axios.get(`${this.api}/products`)
        const user = VueCookies.get('user')
        if (!user.market_name) {
          alert('Do\'kon nomida xatolik mavjud')
          return
        }
        console.log(user.market_name);
        this.products = this.filterProductsByMarketName(products.data, user)
        // this.products = products.data
        if (!this.products.length) {
          alert('Mahsulotlar  topilmadi')
          return
        }
        localStorage.setItem("products", JSON.stringify(this.products))
        console.log(this.products);
      } catch (error) {
        console.log(error);
      }
    },
    filterProductsByMarketName(products, currentUser) {
      console.log(products);
      return products.filter((products) => products.market_name === currentUser.market_name);
    },


    async getReport(specialApi) {
      try {
        const products = await axios.get(`${this.api}/${specialApi}`)
        return products.data;
      } catch (error) {
        console.log(error);
      }
    },
    async filterByDateRange(startDate, endDate, specialApi) {
      const report = await this.getReport(specialApi);

      let start = new Date(startDate);
      start.setHours(0, 0, 0, 0); // set time to the start of the day
      let end = new Date(endDate);
      end.setHours(23, 59, 59, 999); // set time to the end of the day
      let filteredItems = report.filter(el => {
        let createdDate = new Date(el.created);
        return createdDate >= start && createdDate <= end;
      });
      console.log(start);
      return filteredItems
    },

    calculateTotalValueAndProfit(products) {
      let totalValue = 0;
      let totalProfit = 0;
      let totalEntryValue = 0
      products.forEach(product => {
        let value = product.price * product.quantity;
        let profit = (product.price - product.entry_price) * product.quantity;
        let noFrofit = product.entry_price * product.quantity
        totalEntryValue += noFrofit
        totalValue += value;
        totalProfit += profit;
      });

      return { totalValue, totalProfit, totalEntryValue }
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
        if (this.clients.length > 1) {
          this.clients[this.clientIndex].unshift(product)
          localStorage.setItem('client', JSON.stringify(this.clients))
        }
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
        this.deleteClient(this.clientIndex)
      }



    },
    getProductFromStorage() {
      this.productsFromStorage = JSON.parse(localStorage.getItem("productsForSell"));
      console.log(this.productsFromStorage);
    },
    createNewClient() {
      this.clients.unshift([])
      this.getClient(0)
      this.setItemToStorage('clients', this.clients)
    },
    setItemToStorage(name, param) {
      localStorage.setItem(name, JSON.stringify(param));
    },
    getItemFromStorage(name) {
      return JSON.parse(localStorage.getItem(name));
    },
    addClient() {
      if (this.itemsForSell.length) {

        let clients = JSON.parse(localStorage.getItem('clients')) || []
        clients.unshift(this.itemsForSell)
        localStorage.setItem('clients', JSON.stringify(clients))
        this.clients = clients
        console.log(clients);
        this.itemsForSell = []
      }
      else {
        return
      }
    },
    getClient(index) {
      console.log(index);
      let choosedClient = this.clients[index]
      this.itemsForSell = []
      this.clientIndex = index
      console.log(this.clientIndex);
      choosedClient.map((cli) => {
        this.itemsForSell.push(cli)
      })
    },
    deleteClient(index) {
      this.clients.splice(index, 1)
      localStorage.setItem('clients', JSON.stringify(this.clients));
      this.itemsForSell = []
    }
  },
})