import { defineStore } from 'pinia'
import axios from 'axios'
import { nextTick } from 'vue'
import VueCookies from "vue-cookies";

export const useCentralStore = defineStore('central', {
  state: () => ({
    api: 'https://justserver-x2jf.onrender.com/api',
    products: JSON.parse(localStorage.getItem('products')) || [],
    items: [],
    itemsForSell: [],
    cartOpen: false,
    productsFromStorage: JSON.parse(localStorage.getItem('productsForSell')) || [],
    check: [],
    clients: JSON.parse(localStorage.getItem('clients')) || [],
    clientIndex: 0,
    loading: false,
    notAdded: JSON.parse(localStorage.getItem('notAdded')) || [],
    itemForShow: null,
    totalSum: 0,
    notPatched: JSON.parse(localStorage.getItem('notPatched')) || [],
    user: VueCookies.get('user') || null,

  }),
  getters: {
    doubleCount: (state) => state.count * 2,
    filterItem: (state) => state.products.filter((item) => item.name == "Silver")
  },
  actions: {
    async getProductsFromServer() {
      try {
        // Start loading
        this.loading = true

        // Fetch products from the server
        const products = await axios.get(`${this.api}/products`)

        // Get the user from cookies
        const user = VueCookies.get('user')

        // If there is no user, alert the user to log in again
        if (!user) {
          alert('Iltimos Hisobga qayta kiring')
          return
        }

        // Log the user
        console.log(user);

        // Filter the products by the market name and assign it to this.products
        this.products = this.filterProductsByMarketName(products.data, user)

        // If there are no products, alert the user
        if (!this.products.length) {
          alert('Mahsulotlar  topilmadi')
          return
        }

        // Store the products in local storage
        localStorage.setItem("products", JSON.stringify(this.products))

        // Log the products
        console.log(this.products);

        // Stop loading
        this.loading = false
      } catch (error) {
        // Log any errors
        console.log(error);
      }
    },

    filterProductsByMarketName(products, currentUser) {
      // Log the products
      console.log(products);

      // Filter the products based on the market name of the current user
      // Return only those products whose market name matches with the market name of the current user
      return products.filter((products) => products.market_name === currentUser.market_name);
    },


    async postProducts(products, api) {
      // Get the user from cookies
      const user = VueCookies.get('user')

      // Loop through each product in the products array
      for (let product of products) {
        // Log the current product
        console.log(product);

        try {
          // Make a POST request to the server with the product details
          const response = await axios.post(`${this.api}/${api}`, {
            name: product.name,
            quantity: product.quantity,
            price: product.price,
            entry_price: product.entry_price,
            bar_code: product.bar_code,
            salesman: user.name,
            size: product.size,
            market_name: user.market_name,
            created: product.created
          })

          // Assign the response message to this.itemForShow
          this.itemForShow = response.data.message
        }

        catch (error) {
          // If there is an error, add the product to the notAdded array
          this.notAdded.push(product)

          // Store the notAdded array in local storage
          this.setItemToStorage('notAdded', this.notAdded)

          // Log the error
          console.log(error)
        }
      }
    },
    async decrementQuantityFromStore(products) {
      for (let product of products) {
        console.log(product);
        try {
          const response = await axios.patch(
            this.api + '/products/decrement/' + product._id,
            {
              _id: product._id,
              quantity: product.quantity,
            }
          );
          console.log(response.data, 'quantity');
        } catch (error) {
          this.notPatched.push(product)
          this.setItemToStorage('notPatched', this.notPatched)

        }
      }
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
      // Fetch the report from the server using the special API
      const report = await this.getReport(specialApi);
      console.log(report);
      const items = this.filterProductsByMarketName(report, this.user)
      // Create a new Date object for the start date and set the time to the start of the day
      let start = new Date(startDate);
      start.setHours(0, 0, 0, 0);

      // Create a new Date object for the end date and set the time to the end of the day
      let end = new Date(endDate);
      end.setHours(23, 59, 59, 999);

      // Filter the items in the report based on the created date
      let filteredItems = items.filter(el => {
        // Create a new Date object for the created date of the item
        let createdDate = new Date(el.created);

        // Return true if the created date is within the start and end dates, false otherwise
        return createdDate >= start && createdDate <= end;
      });

      // Log the start date
      console.log(start);

      // Return the filtered items
      return filteredItems;
    },


    calculateTotalValueAndProfit(products) {
      // Initialize total value, total profit, and total entry value to 0
      let totalValue = 0;
      let totalProfit = 0;
      let totalEntryValue = 0

      // Loop through each product in the products array
      products.forEach(product => {
        // Calculate the value of the product as price times quantity
        let value = product.price * product.quantity;

        // Calculate the profit for the product as (price - entry price) times quantity
        let profit = (product.price - product.entry_price) * product.quantity;

        // Calculate the entry value (no profit) for the product as entry price times quantity
        let noFrofit = product.entry_price * product.quantity

        // Add the value, profit, and entry value to the total values
        totalEntryValue += noFrofit
        totalValue += value;
        totalProfit += profit;
      });

      // Return an object with the total value, total profit, and total entry value
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
    filterProductsByCode(code) {
      this.items = this.products.filter(item => item.bar_code == code);
      if (this.items.length > 1) {
        this.cartOpen = true
      }
      else {
        this.addToCart(this.items[0])
      }
      console.log(this.items);
    },
    addToCart(product) {
      // Check if the product is not already in the itemsForSell array
      if (!this.itemsForSell.some(i => i === product)) {
        // Get the current date and time
        const date = Date.now()

        // Log the date
        console.log(date);

        // Set the created property of the product to the current date
        product.created = date

        // Add the product to the beginning of the itemsForSell array
        this.itemsForSell.unshift(product)

        // Reset the quantity of the product
        product.quantity = ''

        // Close the cart
        this.cartOpen = false

        // If there is more than one client, add the product to the beginning of the current client's array
        // and save the clients array to local storage
        if (this.clients.length > 1) {
          this.clients[this.clientIndex].unshift(product)
          localStorage.setItem('client', JSON.stringify(this.clients))
        }
      } else {
        // If the product is already in the itemsForSell array, increment its quantity
        product.quantity++

        // Close the cart
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
      // Log the key pressed
      console.log(key);

      // If the 'ArrowUp' key is pressed, increment the quantity of the item
      if (key == 'ArrowUp') {
        item.quantity++
      }

      // If the 'ArrowDown' key is pressed, decrement the quantity of the item
      if (key == 'ArrowDown') {
        this.decrementQunatity(item.quantity);
      }

      // If the key pressed is a number or '.', append it to the current quantity
      if (!isNaN(key) || key == '.') {
        item.quantity = item.quantity.toString() + key;
        parseFloat(item.quantity)
      }

      // If the 'Delete' key is pressed, delete the product
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
      // Check if there are items to sell
      if (this.itemsForSell.length) {
        // Initialize an empty array for items
        let item = []

        // Get the items for sell from local storage, if any
        item = JSON.parse(localStorage.getItem('productsForSell')) || []
        // Add the total sum to each item
        this.itemsForSell.forEach(product => {
          product.totalSum = product.price * product.quantity;
        });
        // Add the current items for sell to the beginning of the items array
        item.unshift(this.itemsForSell)

        // Store the updated items array in local storage
        localStorage.setItem('productsForSell', JSON.stringify(item))

        // Get the products from storage
        this.getProductFromStorage()

        // Clear the items for sell
        this.itemsForSell = []

        // Delete the current client
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
      // Check if there are items to sell
      if (this.itemsForSell.length) {
        // Initialize an empty array for clients
        let clients = JSON.parse(localStorage.getItem('clients')) || []

        // Add the current items for sell to the beginning of the clients array
        clients.unshift(this.itemsForSell)

        // Store the updated clients array in local storage
        localStorage.setItem('clients', JSON.stringify(clients))

        // Update the clients array
        this.clients = clients

        // Log the clients array
        console.log(clients);

        // Clear the items for sell
        this.itemsForSell = []
      }
      else {
        // If there are no items to sell, return
        return
      }
    },

    getClient(index) {
      // Log the index
      console.log(index);

      // Get the client at the given index
      let choosedClient = this.clients[index]

      // Clear the items for sell
      this.itemsForSell = []

      // Set the client index to the given index
      this.clientIndex = index

      // Log the client index
      console.log(this.clientIndex);

      // Add each item from the chosen client to the items for sell
      choosedClient.map((cli) => {
        this.itemsForSell.push(cli)
      })
    },

    deleteClient(index) {
      this.clients.splice(index, 1)
      localStorage.setItem('clients', JSON.stringify(this.clients));
      this.itemsForSell = []
    },
    async postEntryProducts(product) {
      try {
        const response = await axios.post(this.api + '/entry-products', {
          name: product.name,
          quantity: product.quantity_in_store,
          price: product.price,
          entry_price: product.entry_price,
          bar_code: product.bar_code,
          salesman: this.user.name,
          size: product.size,
          market_name: this.user.market_name,
          created: product.created
        })
        console.log(response.data);
      } catch (error) {
        console.log(error);
      }
    }
  },
})