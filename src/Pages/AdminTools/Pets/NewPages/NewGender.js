import React, { Component } from 'react'
import { Button, Form, Message, } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css';
import i18n from '../../../../Component/i18n/i18n';

export class NewGender extends Component {

	constructor(props) {
		super(props);
		this.state = {
			genders: {},
			gender: '',
			errorMessage: "",
			successMessage: "",
		}
	}
	setInputValue(property, val) {
		val = val.trim();
		if (val.length > 500) {
			return;
		}
		this.setState({
			[property]: val,
		})
	}
	
	async updateGenderInfo() {
		try {
			let res = await fetch('http://127.0.0.1:5000/managegender', {
				method: 'POST',
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json',
					'Authorization': "Bearer " + localStorage.getItem('token')
				},
				body: JSON.stringify({
					gender: this.state.gender,
				})
			});
			let result = await res.json();
			if (result.message === "New Gender Has been Added") {
				this.setState({
					successMessage: "New Gender Has been Added"
				})
			}

		} catch (e) {
			this.setState({
				errorMessage: "Server Error. Please Refresh Page"
			})
		}
	}
	render() {
		return (
			<div style={{ paddingTop: "60px" }}>
				<div style={{ paddingLeft: '2%' }}>
					<Button className="backButton" href="/manageGenders"> &#8592; {i18n.t("manageGenders.back")} </Button>
				</div>
				<h2>{i18n.t("manageGenders.addTitle")} </h2>
				<div className="message">
					{this.state.errorMessage &&
						<Message className="error"> {this.state.errorMessage} </Message>}
					{this.state.successMessage &&
						<Message className="success"> {this.state.successMessage} </Message>}
				</div>
				<div style={{ paddingLeft: "35%", paddingRight: "35%" }}>
					<Form>
						<Form.Field >
							<label>{i18n.t("manageGenders.genderName")}</label>
							<input
								name="gender"
								placeholder={i18n.t("manageGenders.genderName")}
								value={this.state.gender}
								onChange={e => this.setInputValue('gender', e.target.value)}
							/>
						</Form.Field>
						<Form.Field>
							<Form.Button
								style={{ width: "100%", }}
								content={i18n.t("manageGenders.add")}
								onClick={this.updateGenderInfo.bind(this)}
							>
							</Form.Button>
						</Form.Field>
					</Form>
				</div>
			</div>
		)
	}
}

export default NewGender