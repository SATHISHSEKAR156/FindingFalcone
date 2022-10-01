import React, { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import '../styles/components.css';
import { findQueen } from '../utils/service-util';
import Loader from './loader';

export default function ShowResult() {
    const history = useHistory();
    const location = useLocation();
    const { state: request } = location.state;
    const { timeTaken = '', payload = {} } = request;

    const [isLoading, setLoading] = useState(true);
    const [result, setResult] = useState({
        status: 'false',
        planet_name: ''
    });
    const { status, planet_name } = result;

    useEffect(() => {
        fetchResult(payload);
    }, [payload]);

    const fetchResult = async (data) => {
        const response = await findQueen(data);
        setResult({ ...result, ...response });
        setLoading(false);
    };

    return <div>
        {
            isLoading ? <Loader content={'Finding queen....'} /> : <div>
                {
                    status === 'success' ? <div>
                        <h3 style={{ color: '#00a278' }}>Success! Congratulations on Finding Falcone. King shah might be pleased.</h3>
                        <h4>{`Time Taken: ${timeTaken}`}</h4>
                        <h4>{`Planet found: ${planet_name}`}</h4>
                    </div> : <div>
                        <h3 style={{ color: '#EB1D36' }}>Oops! Not able to find the Falcone. Try Again :( </h3>
                    </div>
                }
                <button className="find-button" onClick={() => history.push('/')}>Start Again</button>
            </div>
        }
    </div>
}