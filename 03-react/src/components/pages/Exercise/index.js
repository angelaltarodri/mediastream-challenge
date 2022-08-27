import './assets/styles.css'
import React, { useState } from 'react'

export default function Exercise01 () {
  const movies = [
    {
      id: 1,
      name: 'Star Wars',
      price: 20
    },
    {
      id: 2,
      name: 'Minions',
      price: 25
    },
    {
      id: 3,
      name: 'Fast and Furious',
      price: 10
    },
    {
      id: 4,
      name: 'The Lord of the Rings',
      price: 5
    }
  ]

  const discountRules = [
    {
      m: [3, 2],
      discount: 0.25
    },
    {
      m: [2, 4, 1],
      discount: 0.5
    },
    {
      m: [4, 2],
      discount: 0.1
    }
  ]

  const [cart, setcart] = useState([
    {
      id: 1,
      name: 'Star Wars',
      price: 20,
      quantity: 2
    }
  ])

  const getTotal = () => {
    let total = 0
    for (let i = 0; i < cart.length; i++) {
      for (let j = 0; j < cart[i].quantity; j++) {
        total += cart[i].price
      }
    }
    const ids = cart.map(item => item.id).sort()
    let discount = 0
    for (let i = 0; i < discountRules.length; i++) {
      let existsDiscount = true
      for (let j = 0; j < discountRules[i].m.length; j++) {
        existsDiscount = ids.includes(discountRules[i].m[j]) && existsDiscount
      }
      if (existsDiscount && discount < discountRules[i].discount) {
        discount = discountRules[i].discount
      }
    }
    return total * (1 - discount)
  } // TODO: Implement this

  const addCart = (o) => {
    const exists = cart.find(item => item.id === o.id)
    if (!exists) {
      setcart([...cart, { ...o, quantity: 1 }])
    }
  }
  // x is the movie and u is the unit to sum or remove
  const quantityUnit = (x, u) => {
    const index = cart.findIndex(item => item.id === x.id)
    let newCart = cart
    if (newCart[index].quantity === 1 && u === -1) {
      newCart = newCart.filter((item, i) => i !== index)
    } else {
      newCart[index].quantity += u
    }
    setcart([...newCart])
  }
  return (
    <section className="exercise01">
      <div className="movies__list">
        <ul>
          {movies.map((o, i) => (
            <li className="movies__list-card" key={i}>
              <ul>
                <li>
                  ID: {o.id}
                </li>
                <li>
                  Name: {o.name}
                </li>
                <li>
                  Price: ${o.price}
                </li>
              </ul>
              <button onClick={() => addCart(o)}>
                Add to cart
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div className="movies__cart">
        <ul>
          {cart.map((x, i) => (
            <li className="movies__cart-card" key={i}>
              <ul>
                <li>
                  ID: {x.id}
                </li>
                <li>
                  Name: {x.name}
                </li>
                <li>
                  Price: ${x.price}
                </li>
              </ul>
              <div className="movies__cart-card-quantity">
                <button onClick={() => quantityUnit(x, -1)}>
                  -
                </button>
                <span>
                  {x.quantity}
                </span>
                <button onClick={() => quantityUnit(x, +1)}>
                  +
                </button>
              </div>
            </li>
          ))}
        </ul>
        <div className="movies__cart-total">
          <p>Total: ${getTotal()}</p>
        </div>
      </div>
    </section>
  )
}
