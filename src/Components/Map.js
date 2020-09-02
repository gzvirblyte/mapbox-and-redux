import React from 'react';
import ReactMapGl, { NavigationControl, Marker } from 'react-map-gl';

const MAPBOX_TOKEN = process.env.REACT_APP_MAPBOX_TOKEN;

class Map extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            viewport: {
                latitude: 54.6872,
                longitude: 25.2797,
                zoom: 12,
                width: '100vw',
                height: '100vh',
            },
            point: [[0, 0]],
            distance: 0
        }
    }

    handleClick = (e) => {
        this.setState({
            point: [...this.state.point, [e.lngLat[0], e.lngLat[1]]]
        })
        let distance = this.getFullDistance();
        this.setState({ distance })
    }

    getFullDistance = () => {
        const points = this.state.point;
        let distance = 0;
        for (let i = 1; i < points.length; i++) {
            if (points[i + 1] !== undefined) {
                distance += this.calcDistance(points[i], points[i + 1])
            }
        }
        // console.log(`DISTANCE ${distance.toFixed(2)} KM`)
        return distance;
    }

    calcDistance = (mk1, mk2) => {
        const R = 6371.0710; // Radius of the Earth in kilometres
        const rlat1 = mk1[1] * (Math.PI / 180); // Convert degrees to radians
        const rlat2 = mk2[1] * (Math.PI / 180); // Convert degrees to radians
        const difflat = rlat2 - rlat1; // Radian difference (latitudes)
        const difflon = (mk2[0] - mk1[0]) * (Math.PI / 180); // Radian difference (longitudes)
        const distance = 2 * R * Math.asin(Math.sqrt(Math.sin(difflat / 2) * Math.sin(difflat / 2) + Math.cos(rlat1) * Math.cos(rlat2) * Math.sin(difflon / 2) * Math.sin(difflon / 2)));
        return distance;
    }

    render() {
        const markers = this.state.point.map(point =>
            <Marker
                key={point}
                latitude={point[1]} longitude={point[0]} offsetLeft={-20} offsetTop={-10}>
                <img className="marker" src="marker.svg" alt="marker" />
            </Marker>
        );

        return (
            <div>
                <ReactMapGl
                    {...this.state.viewport}
                    mapboxApiAccessToken={MAPBOX_TOKEN}
                    mapStyle="mapbox://styles/gabijaz/ckejp02ko5y7019pt8snuj3lz"
                    onViewportChange={(viewport) => this.setState({ viewport })}
                    onClick={this.handleClick}
                >
                    {markers}


                    <div style={{ position: 'absolute', left: 10, top: 10 }}>
                        <NavigationControl />
                    </div>
                    <button onClick={this.getFullDistance}>GET DISTANCE</button>
                </ReactMapGl>
            </div>
        )
    }
}

export default Map;