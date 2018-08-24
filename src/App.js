import React, { Component } from 'react';

import './App.css';

const Item = ({ item, add }) => (
	<li>
		{item.text}
		{!item.added ? (
			<span className="add-item" onClick={() => add(item)}>
				Add Item
			</span>
		) : (
			<span>Already added</span>
		)}
	</li>
);

const ItemList = ({ items, add }) => {
	const itemEntry = items.map(item => (
		<Item item={item} key={item.id} add={add} />
	));
	return <ul style={{ flex: 1, listStyle: 'none' }}>{itemEntry}</ul>;
};

const CartItem = ({ item, remove }) => (
	<li>
		<span className="remove-item" onClick={() => remove(item)}>
			{item.text}
			<span>X</span>
		</span>
	</li>
);

const Cart = ({ items, remove }) => {
	const itemEntry = items.map(item => {
		return <CartItem item={item} key={item.id} remove={remove} />;
	});

	return <ul style={{ flex: 1, listStyle: 'none' }}>{itemEntry}</ul>;
};

class App extends Component {
	constructor(props) {
		super(props);

		this.removeItem = this.removeItem.bind(this);

		this.state = {
			data: [
				{
					id: '1',
					text: 'item 1',
					added: false
				},
				{
					id: '2',
					text: 'item 2',
					added: false
				},
				{
					id: '3',
					text: 'item 3',
					added: false
				},
				{
					id: '4',
					text: 'item 4',
					added: false
				}
			],
			cartItems: []
		};
	}

	addItem(val) {
		const addItem = val;

		if (!this.state.cartItems.includes(addItem)) {
			const findItem = this.state.data.find((item, index) => {
				return this.state.data[index] === addItem;
			});

			findItem.added = true;

			this.state.cartItems.push(addItem);
			this.setState({ cartItems: this.state.cartItems });
		}
	}

	removeItem(val) {
		this.setState(state => ({
			cartItems: state.cartItems.filter((item, index) => item.id !== val.id)
		}));

		const findItem = this.state.data.find((item, index) => {
			return this.state.data[index] === val;
		});

		findItem.added = false;
	}

	render() {
		return (
			<div className="app">
				<ItemList items={this.state.data} add={this.addItem.bind(this)} />
				<Cart items={this.state.cartItems} remove={this.removeItem} />
			</div>
		);
	}
}

export default App;
