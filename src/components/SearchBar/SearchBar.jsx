import React, { Component } from 'react';
import Form from '../Form/Form';
import Input from '../Input/Input';
import Button from '../Button/Button';

import './SearchBar.scss';

/*
	This component will collect
	the user entered values to make
	api request with respected data.
*/
class SearchBar extends Component {
	inputRef = React.createRef();
	// eslint-disable-next-line lines-between-class-members
	buttonRef = React.createRef();

	constructor(props) {
		super(props);
		this.state = {
			formData: {
				firstInput: {
					elementId: 'firstInput',
					value: ''
				},
				secondInput: {
					elementId: 'secondInput',
					value: ''
				}
			}
		};
	}

	// handler for for submit with latest data in the state
	formOnSubmitHandler = event => {
		event.preventDefault();

		// const { formData } = this.state;

		// dispatch(actions.storeFromData(formData));

		// we can create a redux connection to store formData
		// so we stored year data can be used as paramater for
		// api request in other component.
	};

	// handler function for input to store values to local state on every change
	inputChangedHandler = (event, inputIdentifier) => {
		const { formData } = this.state;

		const updatedformData = {
			...formData
		};

		const updatedFormElement = {
			...updatedformData[inputIdentifier]
		};

		updatedFormElement.value = event.target.value;

		updatedformData[inputIdentifier] = updatedFormElement;
		this.setState({
			formData: updatedformData
		});
	};

	render() {
		const { formData } = this.state;
		return (
			<div className="SearchBar">
				<Form
					method="POST"
					onSubmit={this.formOnSubmitHandler}
					className="SearchBar__form"
				>
					<Input
						id="firstInput"
						className="SearchBar__input"
						label="Initial Year:"
						placeholder="Enter initial year"
						type="text"
						onChange={event =>
							this.inputChangedHandler(event, 'firstInput')
						}
						ariaLabel="Initial year input"
						ref={this.inputRef}
						value={formData.firstInput.value}
					/>
					<Input
						id="secondInput"
						className="SearchBar__input"
						label="End Year:"
						placeholder="Enter end year"
						type="text"
						onChange={event =>
							this.inputChangedHandler(event, 'secondInput')
						}
						ariaLabel="End year input"
						ref={this.inputRef}
						value={formData.secondInput.value}
					/>
					<Button
						type="submit"
						className="SearchBar__button"
						label="Send"
						ref={this.buttonRef}
					/>
				</Form>
			</div>
		);
	}
}

export default SearchBar;
