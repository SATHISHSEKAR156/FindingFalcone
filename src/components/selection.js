import React, { useEffect, useState } from 'react';
import "../styles/components.css";
import DownIcon from "../icons/caret-down-solid.svg";

export default function Selection(props) {
    const { index, planets, vehicles, selOptions, handlePlanetSelect = () => { }, handleVehicleSelect = () => { } } = props;

    const [searchTerm, setSearchTerm] = useState('');
    const [autoCompleteList, setAutoCompleteList] = useState([]);
    const [showOptions, setShowOptions] = useState(false);

    useEffect(() => {
        setSearchTerm(selOptions.planets[index]?.name ?? '');
    }, [selOptions, index]);

    useEffect(() => {
        setAutoCompleteList([...planets])
    }, [planets]);

    //For maintaing the search term & to provide the autocomplete list
    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
        const term = event.target.value.toLowerCase();
        const temp = planets.filter((opt) => opt.name.toLowerCase().includes(term));
        setAutoCompleteList([...temp]);
    };

    //For handling the options visibility
    const handleOptionsShow = () => {
        setShowOptions(!showOptions);
    };

    //To update the selected option
    const handleOptionClick = (selOpt) => {
        setSearchTerm(selOpt.name);
        setShowOptions(false);
        handlePlanetSelect(selOpt, index);
    };

    //To open the dropdown on clicking the input box
    const handleInputClick = () => {
        if (!showOptions) {
            setShowOptions(true);
        }
    };

    //For handling the selected vehicle
    const handleVehicleSelection = (vehicle) => {
        const { name } = vehicle;
        handleVehicleSelect(index, name);
    };

    const renderPlanetOptions = () => {
        return autoCompleteList.length ? autoCompleteList.map((opt, index) => {
            return <div key={`${opt}-${index}`} onClick={() => handleOptionClick(opt)} className="planet-option">
                <p>{opt.name}</p>
            </div>
        }) : <div className="no-options">
            <p>No options found</p>
        </div>
    };

    const renderVehicleOptions = () => {
        return vehicles.map((vehicle) => {
            const { name, total_no, max_distance } = vehicle;
            const { vehicles, planets } = selOptions;

            return <div key={`${index}-${name}`} className="vehicle-option" onClick={() => handleVehicleSelection(vehicle)} >
                <input disabled={planets[index]?.distance > max_distance || (total_no === 0 && vehicles[index] !== name)} style={{ cursor: 'pointer' }} readOnly type="radio" value={name} checked={vehicles[index] === name} />
                <p style={{ cursor: 'pointer' }}>{`${name} (${total_no})`}</p>
            </div>
        })
    };

    return <div style={{ position: 'relative', margin: "10px" }}>
        <div className="planet-select">
            <div>
                <input className="planet-input" onClick={handleInputClick} value={searchTerm} onChange={handleSearch} placeholder="Select Planet" />
            </div>
            <div onClick={handleOptionsShow} className="icon-container">
                <img src={DownIcon} alt="down" className="icon" />
            </div>
        </div>
        {showOptions && <div className="option-container">
            {renderPlanetOptions()}
        </div>}
        <div className="vehicle-select">
            {renderVehicleOptions()}
        </div>
    </div>
}