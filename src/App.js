import React, { Component } from 'react';
import './App.css';

const Item = ({item, add}) => {
  return (
    <li>
      {item.text}
      {!item.added 
      ? <span className="add-item" onClick={() => {add(item)}}>Add Item</span>
      : <span>Already added</span>
      }      
    </li>
  );
}

const ItemList = ({items, add}) => {
  const itemEntry = items.map((item) => {    
    return (<Item item={item} key={item.id} add={add} />);
  });
  return (<ul style={{flex: 1, listStyle: 'none'}}>{itemEntry}</ul>)
};

const CartItem = ({item, remove}) => {
  return (
    <li>
      <span className="remove-item" onClick={() => {remove(item)}}>{item.text}<span>X</span></span>
    </li>
  )
};

const Cart = ({items, remove}) => {
  const itemEntry = items.map((item) => {
    return (<CartItem item={item} key={item.id} remove={remove} />);
  });  
  return (<ul style={{flex: 1, listStyle: 'none'}}>{itemEntry}</ul>)
};

class App extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
       data: [
        {
        
          "id": "1",
          "text": "item 1",
          "added": false
        },
        {
          "id": "2",
          "text": "item 2",
          "added": false
        },
        {
          "id": "3",
          "text": "item 3",
          "added": false
        },
        {
          "id": "4",
          "text": "item 4",
          "added": false
        }
      ],
      cartItems: []
    }
  }

  addItem(addItem) {
    if(!this.state.cartItems.includes(addItem)) {
      addItem.added = true;   
      this.setState(state => ({
        cartItems: [...state.cartItems, addItem]
      }));
    }
  }

  removeItem(removeItem) {
    removeItem.added = false;
    const remainingCartItems = this.state.cartItems.filter((item) => item.id !== removeItem.id );
    this.setState({cartItems: remainingCartItems});
  }

  render() {
    return (
      <div className="app">
        <ItemList 
          items={this.state.data}
          add={this.addItem.bind(this)}
        />
        <Cart 
          items={this.state.cartItems}
          remove={this.removeItem.bind(this)}
        />
      </div>
    );
  }
}

export default App;
