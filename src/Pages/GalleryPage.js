import React, { Component } from 'react'
import '../Assets/Css/PetGallery.css'
import { Dropdown, Card, Image, Loader} from 'semantic-ui-react'
import Footer from "../Component/Footer/Footer"
import i18n from '../Component/i18n/i18n';

export class Gallery extends Component {

	constructor(props) {
		super(props);
		this.state = {
			primaryBreed_id: "",
			primary_breedOption: [],
			genderOptions: [],
			alteredOptions: [],
			animalOptions: [],
			statusOptions: [],
			Pets: [],
			loaded: true
		}
	}

	addFilter = (event, data) => {
		let optionText = event.target.textContent;
		const newList = this.state.Pets.filter((pet) => pet[data.name] === optionText)
		if (optionText !== '') {
			this.setState({
				Pets: newList
			})
		} else {
			this.Pets()
		}
	}
	async Pets() {
		try {
			let res = await fetch('http://127.0.0.1:5000/petgallery', {
				method: 'GET',
			});
			let result = await res.json();
			if (result.message === "successfully Pulled!") {
				this.setState({
					Pets: result.pets
				})
			}
		} catch (e) {
			this.setState({
				errorMessage: "Server Error. Please Refresh Page"
			})
		}
	}

	componentDidMount() {
		this.PetsInit();
	}

	async PetsInit() {
		try {
			let res = await fetch('http://127.0.0.1:5000/petgallery', {
				method: 'GET',
			});
			let result = await res.json();
			if (result.message === "successfully Pulled!") {
				result.breeds.forEach((breed, i) => {
					this.setState({
						arr: this.state.primary_breedOption.push({ 'key': breed.id, 'value': breed.id, 'text': breed.breed })
					})
				})

				result.genders.forEach((gender, i) => {
					this.setState({
						arr: this.state.genderOptions.push({ 'key': gender.id, 'value': gender.id, 'text': gender.gender })
					})
				})

				result.altered.forEach((altered, i) => {
					this.setState({
						arr: this.state.alteredOptions.push({ 'key': altered.id, 'value': altered.id, 'text': altered.status })
					})
				})
				result.animal.forEach((animal, i) => {
					this.setState({
						arr: this.state.animalOptions.push({ 'key': animal.id, 'value': animal.id, 'text': animal.animal })
					})
				})
				this.setState({
					Pets: result.pets,
					loaded: false
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
				<h1>{i18n.t("petGallery.title")}</h1>
				<div className="row" >
					<div className="column-petGallery">
						<Dropdown
							placeholder={i18n.t("petGallery.breed")}
							name="primary_breed"
							fluid
							multiple
							search
							selection
							onChange={this.addFilter}
							options={this.state.primary_breedOption}
						/>
					</div>
					<div className="column-petGallery">
						<Dropdown
							placeholder={i18n.t("petGallery.coat")}
							name="color"
							fluid
							multiple
							search
							selection
							options={[]}
						/>
					</div>
					<div className="column-petGallery">
						<Dropdown
							placeholder={i18n.t("petGallery.petType")}
							name="animal_type"
							fluid
							multiple
							search
							selection
							onChange={this.addFilter}
							options={this.state.animalOptions}
						/>
					</div>
					<div className="column-petGallery">
						<Dropdown
							placeholder={i18n.t("petGallery.alterStatus")}
							name="altered"
							fluid
							multiple
							search
							selection
							options={this.state.alteredOptions}
						/>
					</div>
					<div className="column-petGallery">
						<Dropdown
							placeholder={i18n.t("petGallery.gender")}
							name="gender"
							fluid
							multiple
							search
							selection
							onChange={this.addFilter}
							options={this.state.genderOptions}
						/>
					</div>
				</div>
				<div className="row" >
					{this.state.loaded ?
						<Loader active inline='centered' /> :
							this.state.Pets.map((pet, i) =>
								<div className="column-petGalleryCard" key={i}>
										<Card>
											<Image src={pet.pet_image} ui={false} 
											style={{ height: "400px" }}/>
											<Card.Content>
												<Card.Header>{pet.pet_name}</Card.Header>
												<Card.Meta>
													<span className='date'>{i18n.t("petGallery.breed")}: {pet.primary_breed}</span>
												</Card.Meta>
												<Card.Meta>
													<span className='date'>{i18n.t("petGallery.gender")}: {pet.gender}</span>
												</Card.Meta>
												<Card.Meta>
													<span className='date'>{i18n.t("petGallery.altered")}: {pet.altered_status}</span>
												</Card.Meta>
												<Card.Meta>
													<span className='date'>{i18n.t("petGallery.status")}: {pet.pet_status}</span>
												</Card.Meta>
												<Card.Description>
												{pet.animal_type}
												</Card.Description>
											</Card.Content>
										</Card>
								</div>
							)
					}
				</div>
				<Footer />
			</div>
		)
	}
}

export default Gallery