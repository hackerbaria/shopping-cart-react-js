import React, { Component } from 'react';


export const DataContext = React.createContext();

export class DataProvider extends Component {
    state = {
        products: [
            {
                "_id": "1",
                "title": "Nike Shoes 01",
                "src": "https://macbook.haloshop.vn/image/cache/data/products/apple/macbook/macbook-pro-2020-13-inch-chip-m1-gray-00-700x700.jpg",
                "description": "UI/UX designing, html css tutorials",
                "content": "Welcome to our channel Dev AT. Here you can learn web designing, UI/UX designing, html css tutorials, css animations and css effects, javascript and jquery tutorials and related so on.",
                "price": 23,
                "colors": ["red", "black", "crimson", "teal"],
                "count": 1
            },
            {
                "_id": "2",
                "title": "Nike Shoes 02",
                "src": "https://macbook.haloshop.vn/image/cache/data/products/apple/macbook/macbook-pro-2020-13-inch-chip-m1-gray-00-700x700.jpg",
                "description": "UI/UX designing, html css tutorials",
                "content": "Welcome to our channel Dev AT. Here you can learn web designing, UI/UX designing, html css tutorials, css animations and css effects, javascript and jquery tutorials and related so on.",
                "price": 19,
                "colors": ["red", "crimson", "teal"],
                "count": 1
            },
            {
                "_id": "3",
                "title": "Nike Shoes 03",
                "src": "https://stcv4.hnammobile.com/uploads/products/colors/2/apple-ipad-pro-12-9-wifi-256-gb-2020-01585099509.jpg",
                "description": "UI/UX designing, html css tutorials",
                "content": "Welcome to our channel Dev AT. Here you can learn web designing, UI/UX designing, html css tutorials, css animations and css effects, javascript and jquery tutorials and related so on.",
                "price": 50,
                "colors": ["lightblue", "white", "crimson", "teal"],
                "count": 1
            },
            {
                "_id": "4",
                "title": "Nike Shoes 04",
                "src": "https://cdn.cellphones.com.vn/media/catalog/product/cache/7/image/9df78eab33525d08d6e5fb8d27136e95/i/p/iphone-12-pro-max_1__7.jpg",
                "description": "UI/UX designing, html css tutorials",
                "content": "Welcome to our channel Dev AT. Here you can learn web designing, UI/UX designing, html css tutorials, css animations and css effects, javascript and jquery tutorials and related so on.",
                "price": 15,
                "colors": ["orange", "black", "crimson", "teal"],
                "count": 1
            },
            {
                "_id": "5",
                "title": "Nike Shoes 05",
                "src": "https://cdn.cellphones.com.vn/media/catalog/product/cache/7/image/9df78eab33525d08d6e5fb8d27136e95/i/p/iphone-12-pro-max_1__7.jpg",
                "description": "UI/UX designing, html css tutorials",
                "content": "Welcome to our channel Dev AT. Here you can learn web designing, UI/UX designing, html css tutorials, css animations and css effects, javascript and jquery tutorials and related so on.",
                "price": 10,
                "colors": ["orange", "black", "crimson", "teal"],
                "count": 1
            },
            {
                "_id": "6",
                "title": "Nike Shoes 06",
                "src": "https://macbook.haloshop.vn/image/cache/data/products/apple/macbook/macbook-pro-2020-13-inch-chip-m1-gray-00-700x700.jpg",
                "description": "UI/UX designing, html css tutorials",
                "content": "Welcome to our channel Dev AT. Here you can learn web designing, UI/UX designing, html css tutorials, css animations and css effects, javascript and jquery tutorials and related so on.",
                "price": 17,
                "colors": ["orange", "black", "crimson", "teal"],
                "count": 1
            }
        ],
        cart: [],
        total: 0

    };


    addCart = (id) => {
        const { products, cart } = this.state;
        const check = cart.every(item => {
            return item._id !== id;
        })

        if (check) {
            const data = products.filter(product => {
                return product._id === id;
            })
            this.setState({cart: [...cart, ...data]});
        } else {
            alert('The product has been added to cart.');
        }
    };

    reduction = id => {
        const {cart} = this.state;
        cart.forEach(item => {
            if(item._id === id) {
                item.count === 1? item.count =1 : item.count -=1;
            }
        })
        this.setState({cart: cart});
        this.getTotal();
    }

    removeProduct = id => {
        if(window.confirm('Do you want to delete this product?')) {
            const {cart} = this.state;
            cart.forEach((item, index) => {
                if(item._id === id) {
                    cart.splice(index, 1);
                }
            })

            this.setState({cart: cart});
            this.getTotal();
        }
    }

    getTotal = () => {
        const {cart} = this.state;
        const res = cart.reduce((prev, item) => {
            return prev + (item.price * item.count);
        },0)
        this.setState({total: res})

    }

    componentDidUpdate() {
        localStorage.setItem('dataCart', JSON.stringify(this.state.cart))
        localStorage.setItem('dataTotal', JSON.stringify(this.state.total))
    }

    componentDidMount(){
        const dataCart = JSON.parse(localStorage.getItem('dataCart'));
        if(dataCart !== null){
            this.setState({cart: dataCart});
        }
        const dataTotal = JSON.parse(localStorage.getItem('dataTotal'));
        if(dataTotal !== null){
            this.setState({total: dataTotal});
        }
    }

    render() {
        const {products, cart,total} = this.state;
        const {addCart,reduction,increase,removeProduct,getTotal} = this;
        return (
            <DataContext.Provider 
            value={{products, addCart, cart, reduction,increase,removeProduct,total,getTotal}}>
                {this.props.children}
            </DataContext.Provider>
        )
    }


}