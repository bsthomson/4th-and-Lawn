import React, { Component } from "react";
import './../../App.css';
import API from "./../../utils/API";
import CardParkingSpot from './../../components/CardParkingSpot/ParkingSpot';
import moment from "moment";


class ParkingSpots extends Component {
    constructor(props) {
        super(props);

        this.state = {
            parkingspots: [],
            events: [],
            selectedEvent: undefined
        };

        this.loadEvents = this.loadEvents.bind(this);
    }

    componentDidMount() {
        this.loadParkingSpots()
        this.loadEvents()
    }

    loadParkingSpots = () => {
        API.getParkingSpots()
            .then(response => {
                console.log(response.data)
                this.setState({ parkingspots: response.data })
            })
            .then(console.log(this.state.parkingspots))
            .catch(err => console.log(err));
    };

    loadEvents() {
        console.log('loadEvents');
        console.log(this.state);
        API.getEvents()
            .then(response => {
                this.setState({
                    events: response.data
                });
            })
            .then(
                console.log(this.state.events)
            )
            .catch(err => console.log(err))
    }

    handleChange = event => {
        this.setState({
            selectedEvent: event.target.value
        });
    };

    render() {
        return (
            <section>
                {/* <div className="section-header">&nbsp;</div> */}

                <div className="section-parking">

                    <div className="parking__container">
                        {/*  START PAGE HEADER -> */}
                        <section className="parking__header">

                            <div className="parking__heading">
                                <h1 className="heading-primary">
                                    <span className="heading-primary--page-white">Parking Spots</span>
                                </h1>
                            </div>

                            <div className="parking__filter">
                                <form>
                                    <div className="form__filter-container" id="events">
                                        {this.state.events.length ? (
                                            <div className="form__group">
                                                <select name="game" className="form__input" value={this.state.selectedEvent} onChange={this.handleChange}>
                                                    <option>
                                                        Filter By Event
                                                </option>
                                                    {this.state.events.map(event => (
                                                        <option
                                                            key={event._id}
                                                            id="event"
                                                            name="event"
                                                            placeholder="Event"
                                                            value={event.location}>
                                                            {moment(event.date).format("MM-DD-YYYY")} {event.shortName}
                                                        </option>
                                                    ))}
                                                </select>
                                            </div>
                                        ) : (
                                                <div className="form__group">
                                                    <select name="game" className="form__input">
                                                        <option>
                                                            No Games Available
                                                </option>
                                                    </select>
                                                </div>
                                            )}
                                    </div>
                                </form>
                            </div>
                        </section>
                        {/* ^ END PAGE HEADER ^ */}

                        <section className="parking__content">

                            {this.state.selectedEvent ?
                            <CardParkingSpot event={this.state.selectedEvent} /> :
                            <h2>No Spots Available</h2>
                        }

                        </section>
                        {/* END DASHBOARD USER CONTENT */}

                    </div>
                </div>

            </section>
        );
    }
}

export default ParkingSpots;
