import React, {useEffect, useState} from 'react';
import { isPositionValid, move, updateDirection } from './helpers';
import type { Direction, Operations, Position, Robot } from './types';

const ToyRobot = () => {

    const [robo, setRobo] = useState<Robot>({
        isPlacedOnGrid: false,
    } as Robot)

    const [errorText, setErrorText] = useState<string>('');

    const [reportRobo, setReportRobo] = useState<boolean>(false);

    useEffect(() =>{
        setErrorText('');
        setReportRobo(false);
    }, [robo])

    const setGridPosition = (key: 'positionX' | 'positionY') => (e: React.ChangeEvent<HTMLInputElement>) => {
        const input = parseInt(e.target.value);
        if(isPositionValid(input)) {
            setRobo({
                ...robo,
                [key]: input,
                isPlacedOnGrid: false,
            } as Robot)
        }
    }

    const setRoboDirection = (e: React.ChangeEvent<HTMLSelectElement>) => {
        if(e.target.value !== '') {
            setRobo({
                ...robo,
                direction: e.target.value as Direction,
                isPlacedOnGrid: false,
            })
        }
    }

    const roboOperations = (command: Operations) => {
        let updatedRobo: Robot|undefined = undefined;
        switch (command) {
            case 'LEFT':
            case 'RIGHT':
                if(!robo.isPlacedOnGrid) {
                    setErrorText('Please place the robot');
                    return
                }
                updatedRobo = updateDirection(robo, 'RIGHT');
              break;
            case 'MOVE':
                if(!robo.isPlacedOnGrid) {
                    setErrorText('Please place the robot');
                    return
                }
                updatedRobo = move(robo)
              break;
            case 'PLACE': 
                updatedRobo = {...robo, isPlacedOnGrid: true};
                break;
            default:
        }

        if(updatedRobo) {
            setRobo(updatedRobo)
        } else {
            setErrorText("OOPS!! Something is not right here")
        }

    }

    return( 
    <> 
    <div>
        <span>x:</span>
        <input type="number" min={0} max={4} onChange={setGridPosition('positionX')} value={robo.positionX !== undefined ? robo.positionX : ''}></input>
        <span>y:</span>
        <input type="number" min={0} max={4} onChange={setGridPosition('positionY')} value={robo.positionY !== undefined ? robo.positionY : ''}></input>
        <span>Directions</span>
        <select onChange={setRoboDirection} value={robo.direction || ''}>
            <option value=""></option>
            <option value="NORTH">NORTH</option>
            <option value="EAST">EAST</option>
            <option value="SOUTH">SOUTH</option>
            <option value="WEST">WEST</option>
        </select>
    </div>
    <button onClick={() => roboOperations('PLACE')}>Place</button>
    <button onClick={() => roboOperations('LEFT')}>Left</button>
    <button onClick={() => roboOperations('RIGHT')}>Right</button>
    <button onClick={() => roboOperations('MOVE')}>Move</button>
    <button onClick={() => setReportRobo(true)}>Report</button>
    {reportRobo && robo.isPlacedOnGrid && (
        <div>
            {robo.positionX}, {robo.positionY}, {robo.direction}
        </div>
    )}
    {errorText.length > 0 && (
        <div>{errorText}</div>
    )}
    </>
      
    )
}

export default ToyRobot;