import React, { Component } from "react";
import './../../App.css';
import API from "./../../utils/API";
import CardParkingSpot from './../../components/Card-Parking-Spot/ParkingSpot';

class ParkingSpots extends Component {
    state = {
        parkingspots: [],
    };

    componentDidMount() {
        this.loadParkingSpots();
    }

    loadParkingSpots = () => {
        API.getParkingSpots()
            .then(response => this.setState({ 
                parkingspots: response.data
            }))
            .catch(err => console.log(err));
    };

    render() {
        return (
            <section className="section-parking">
             {/* <div className="page-transition background-test"></div> */}

            <h1 className="heading-page">
                <span className="heading-page--title">Available spots near Memorial Stadium</span>
            </h1>

              <CardParkingSpot />
            </section>
        );
    }
}

export default ParkingSpots;
