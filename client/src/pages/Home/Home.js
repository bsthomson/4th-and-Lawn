import React, { Component } from 'react'
import './../../App.css';
import '../../img/parking-garage.jpg'
import PostParkingSpot from '../../components/Form-Post-Parking/PostParking'

class Home extends Component {

    render() {
        return (
            <section className="section-home">
                <PostParkingSpot/>
            </section>
        )
    }
}

export default Home
