import React, { Component } from 'react';
import moment from 'moment';
import API from '../../utils/API';

class ParkingSpotForm extends Component {
    constructor(props) {
        super(props);

        console.log({
            ParkingSpotForm: this.props
        })

        this.state = {
            streetaddress: '',
            city: '',
            state: '',
            zipcode: '',
            availablespots: '',
            instructions: '',
            event: '',
            events: [],
        }

        this.formStyles = {
            visibility: this.props.readOnly ? "hidden" : "visible",
            position: this.props.readOnly ? "absolute" : "inherit"
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmitForm = this.handleSubmitForm.bind(this);
    }

    handleChange(e) {
        this.setState({ [e.target.id]: e.target.value })
    }

    handleSubmitForm(event) {
        event.preventDefault();

        if (!this.props.readOnly)
            this.props.handleSubmit({
                streetaddress: this.state.streetaddress,
                city: this.state.city,
                state: this.state.state,
                zipcode: this.state.zipcode,
                availablespots: this.state.availablespots,
                price: this.state.price,
                instructions: this.state.instructions,
                event: this.state.event
            });
        else
            API.updateParkingSpot(
                this.props._id,
                {
                    price: this.state.price,
                    instructions: this.state.instructions,
                }
            )
    }

    componentDidMount() {
        this.setState({ events: API.getEvents() })
    }

    render() {
        return (
            <div className="PostParkingSpotForm">
                <form>
                    <div id="parkingspotform">
                        <h1 className="heading-primary">
                            <span className="heading-primary--form center">{this.props.formTitle}</span>
                        </h1>
                        <div className="form__group">
                            <input className="form__input"
                                type="text"
                                id="streetaddress"
                                name="streetaddress"
                                placeholder="Address"
                                // value={this.props.streetaddress ? this.props.streetaddress : ""}
                                onChange={this.handleChange}
                                style={this.formStyles}
                            />
                        </div>
                        <div className="form__group">
                            <input className="form__input-xs"
                                type="text"
                                id="city"
                                name="city"
                                placeholder="Lawrence"
                                // value={this.props.city ? this.props.city : ""}
                                onChange={this.handleChange}
                                style={this.formStyles}
                            />
                            <input className="form__input-xs"
                                type="text"
                                id="state"
                                name="state"
                                placeholder="KS"
                                // value={this.props.state ? this.props.state : ""}
                                onChange={this.handleChange}
                                style={this.formStyles}
                            />
                            <input className="form__input-xs"
                                type="text"
                                id="zipcode"
                                name="zipcode"
                                placeholder="66044"
                                // value={this.props.zipcode ? this.props.zipcode : ""}
                                onChange={this.handleChange}
                                style={this.formStyles}
                            />
                        </div>
                        <div className="form__group">
                            <input className="form__input-sm"
                                type="number"
                                id="availablespots"
                                name="availablespots"
                                placeholder="Number of spots"
                                // value={this.props.availablespots ? this.props.availablespots : ""}
                                onChange={this.handleChange}
                                style={this.formStyles}
                            />
                            <input className="form__input-sm"
                                type="number"
                                id="price"
                                name="price"
                                placeholder="Price"
                                // value={this.props.price ? this.props.price : ""}
                                onChange={this.handleChange}
                            />
                        </div>
                        <div className="form__group">
                            <input className="form__input"
                                type="text"
                                id="instructions"
                                name="instructions"
                                placeholder="Instructions for Renter"
                                // value={this.props.instructions ? this.props.instructions : ""}
                                onChange={this.handleChange}
                            />
                        </div>
                        {this.props.events.length > 0 ? (
                            <div
                                className="form__group">
                                <select
                                    id="event"
                                    name="event"
                                    className="form__input"
                                    style={this.formStyles}
                                    // value={this.state.event}
                                    onChange={this.handleChange}>
                                    <option>
                                        Select an Event
                                    </option>
                                    {this.props.events.map(event => (
                                        <option
                                            key={event._id}
                                            id="event"
                                            name="event"
                                            placeholder="Event"
                                            value={event._id}>
                                            {moment(event.date).format("MM-DD-YYYY")} {event.shortName}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        ) : (
                                <div className="form__group">
                                    <select
                                        name="event"
                                        className="form__input"
                                        style={this.formStyles}>
                                        <option>
                                            No Events Available
                                </option>
                                    </select>
                                </div>
                            )}
                        <div className="form__group">
                            <input
                                className="btn btn--form"
                                type="submit"
                                value="Submit"
                                onClick={this.handleSubmitForm}
                            />
                        </div>
                    </div>
                </form>
            </div>
        )
    }
}

export default ParkingSpotForm;