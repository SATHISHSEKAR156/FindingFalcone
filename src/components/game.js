import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import "../styles/components.css";
import { getPlanetData, getSpaceShips } from '../utils/service-util';
import Loader from './loader';
import Selection from './selection';

export default function Game(props) {

    const { reset } = props;
    const history = useHistory();

    //for storing core data
    const [planets, setPlanets] = useState([]);
    const [vehicles, setVehicles] = useState([]);

    //for maintaining the availability
    const [availablePlanets, setAvailablePlanets] = useState([]);

    //for storing selected data
    const [selectedOptions, setSelectedOptions] = useState({
        planets: [],
        vehicles: []
    });
    const [timeTaken, setTimeTaken] = useState(0);

    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        const getCoreData = async () => {
            const planetData = await getPlanetData();
            const spaceShipsData = await getSpaceShips();
            setPlanets([...planetData]);
            setAvailablePlanets([...planetData])
            setVehicles([...spaceShipsData]);
            setLoading(false);
        };

        getCoreData()
    }, []);
    
    //For resetting the default values
    useEffect(() => {
        setSelectedOptions({ planets: [], vehicles: [] });
        setAvailablePlanets([...planets]);
        setTimeTaken(0);
    }, [reset]);
    
    //For filtering out the selected planets
    const handleSelPlanets = (selPlanet, index) => {
        const selPlanets = [...selectedOptions.planets];
        selPlanets[index] = { ...selPlanet };
        const temp = [];
        planets.forEach((planet) => {
            const isAvailable = selPlanets.filter((p) => p?.name === planet.name);
            if (!isAvailable.length) {
                temp.push(planet);
            }
        });
        setAvailablePlanets([...temp]);
        setSelectedOptions({ ...selectedOptions, planets: [...selPlanets] })
    };
    
    //For updating the selected vehicles
    const handleVehicleSelect = (index, selName) => {
        const temp = [...selectedOptions.vehicles];
        temp[index] = selName;
        if (selCountCheck(temp, selName)) {
            const getVehicleData = vehicles.filter((veh) => veh.name === selName);
            const { total_no } = getVehicleData[0];
            let count = 0;
            temp.forEach((dup, ind) => {
                if (dup === selName) {
                    count += 1;
                    if (count > total_no) {
                        temp[ind] = '';
                    }
                }
            });
        }
        setSelectedOptions({ ...selectedOptions, vehicles: [...temp] });
        updateTimeTaken(temp);
    };
    
    //To check wheather the vehicle was selected more than it's available count or not
    const selCountCheck = (data = [], name) => {
        const getVehicleData = vehicles.filter((veh) => veh.name === name);
        const { total_no } = getVehicleData[0];
        const selCount = data.filter((veh) => veh === name);
        if (selCount.length >= total_no) {
            return true;
        }
        return false;
    };
    
    //To provide updated vehicles count data 
    const getVehiclesData = (index = 0) => {
        if (selectedOptions.planets[index]) {
            const selVehicles = selectedOptions.vehicles;
            const uptoIndex = selVehicles.slice(0, index + 1);
            const updatedData = [];
            vehicles.forEach((vehicle) => {
                const { name, total_no } = vehicle;
                const count = uptoIndex.filter((veh) => veh === name);
                if (count.length) {
                    updatedData.push({ ...vehicle, total_no: total_no - count.length });
                } else {
                    updatedData.push({ ...vehicle });
                }
            });
            return [...updatedData];
        }
        return [];
    };
    
    //For updating the time taken
    const updateTimeTaken = (selVehicles) => {
        const { planets: selPlanets } = selectedOptions;
        let timeTaken = 0
        selVehicles.forEach((v, index) => {
            const selVeh = vehicles.filter((veh) => veh.name === v);
            const speed = selVeh[0]?.speed;
            const distance = selPlanets[index]?.distance;
            if (speed && distance) {
                timeTaken += distance / speed;
            }
        });
        setTimeTaken(timeTaken);
    }
   
    //For checking the disabled status for the "Find Falcone" button
    const getDisableStatus = () => {
        const { vehicles: selVehicles } = selectedOptions;

        if (selVehicles.length !== 4) {
            return true;
        }
        let status = false;
        selVehicles.forEach((v) => {
            if (!v) {
                status = true;
            }
        });
        return status;
    };
   
    //For returning the planets name
    const getPlanetsName = (data) => {
        return data.map((d) => {
            return d.name
        })
    };
    
    //For handling submit actions
    const handleSubmit = async () => {
        const payload = {
            planet_names: [...getPlanetsName(selectedOptions.planets)],
            vehicle_names: [...selectedOptions.vehicles]
        }
        history.push('/result', { state: { payload: { ...payload }, timeTaken: timeTaken } });
    };

    const renderSelection = () => {
        return [...Array(4)].map((value, index) => {
            return <Selection
                index={index}
                key={index}
                handlePlanetSelect={handleSelPlanets}
                handleVehicleSelect={handleVehicleSelect}
                selOptions={selectedOptions}
                planets={availablePlanets}
                vehicles={getVehiclesData(index)} />
        })
    };

    return <div>
        {
            isLoading ? <Loader content={'Getting started...'} /> : <div>
                <h3>Select planets you want to search in:</h3>
                <div className="select-container">
                    {renderSelection()}
                </div>
                <div>
                    <h3>{`Time Taken : ${timeTaken}`}</h3>
                </div>
                <div>
                    <button disabled={getDisableStatus()} className="find-button" onClick={handleSubmit}>Find Falcone!</button>
                </div>
            </div>
        }
    </div>
}