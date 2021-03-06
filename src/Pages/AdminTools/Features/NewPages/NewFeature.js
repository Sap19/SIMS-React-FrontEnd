import React, { Component } from 'react'
import { Button, Form, Message, } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css';
import i18n from '../../../../Component/i18n/i18n';

export class NewFeature extends Component {

	constructor(props) {
		super(props);
		this.state = {
			feature: {},
			feature_name: '',
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
	
	async updateFeatureInfo() {
		try {
			let res = await fetch('http://127.0.0.1:5000/managefeatures', {
				method: 'POST',
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json',
					'Authorization': "Bearer " + localStorage.getItem('token')
				},
				body: JSON.stringify({
					feature: this.state.feature_name,
				})
			});
			let result = await res.json();
			if (result.message === "New Feature Has been Added") {
				this.setState({
					successMessage: i18n.t("manageFeatures.new")
				})
			}

		} catch (e) {
			this.setState({
				errorMessage: i18n.t("error")
			})
		}
	}
	render() {
		return (
			<div style={{ paddingTop: "60px" }}>
				<div style={{ paddingLeft: '2%' }}>
					<Button className="backButton" href="/manageFeatures"> &#8592; {i18n.t("manageFeatures.back")} </Button>
				</div>
				<h2>{i18n.t("manageFeatures.addTitle")}</h2>
				<div className="message">
					{this.state.errorMessage &&
						<Message className="error"> {this.state.errorMessage} </Message>}
					{this.state.successMessage &&
						<Message className="success"> {this.state.successMessage} </Message>}
				</div>
				<div style={{ paddingLeft: "35%", paddingRight: "35%" }}>
					<Form>
						<Form.Field >
							<label>{i18n.t("manageFeatures.featureName")}</label>
							<input
								name="feature_name"
								placeholder={i18n.t("manageFeatures.featureName")}
								value={this.state.feature_name}
								onChange={e => this.setInputValue('feature_name', e.target.value)}
							/>
						</Form.Field>
						<Form.Field>
							<Form.Button
								style={{ width: "100%", }}
								content={i18n.t("manageFeatures.addFeature")}
								onClick={this.updateFeatureInfo.bind(this)}
							//value={0}
							>
							</Form.Button>
						</Form.Field>
					</Form>
				</div>
			</div>
		)
	}
}

export default NewFeature