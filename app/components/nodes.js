import {
    ReactFlow, Controls, Background,
} from '@xyflow/react';
import React from 'react';
import '@xyflow/react/dist/style.css';


import CustomNode from './CustomeNode';

function Flow(heroData) {
    const nodeTypes = {
        custom: CustomNode,
    };

    let moovies = heroData.data.films.map((node, i) => {///movie node
        return {
            id: `moovies${i}`,
            data: { label: `Film ${node}`, emoji: '📽' },
            position: { x: i * 100, y: 100 },
            type: 'custom',
        }
    })

    let starShips = heroData.data.starships.map((ship, i) => {////ship node
        return {
            id: `starShips${i}`,
            data: { label: `Ship ${ship} `, emoji: '🛰' },
            position: { x: i * 100, y: 200 },
            type: 'custom',
        }
    })

    let initNodes = [/////Hero node(first node)
        {
            id: `${heroData.data.id}`,
            data: {
                label: `${heroData.data.name}`, emoji: '🦸‍♂️'
            },
            position: { x: 0, y: 0 },
            type: 'custom',
        }

    ].concat(moovies)

    starShips ? initNodes = initNodes.concat(starShips) : initNodes = initNodes

    let firstNode = initNodes[0]
    let filmNodesIDArray = []
    let shipsNodesIDArray = []

    initNodes?.map((node, i, array) => {
        if (i > 0) {////firstNode should be excluded
            if (node.id.substring(0, node.id.length - 1) === 'moovies') {
                filmNodesIDArray.push(node.id)
            } else {
                shipsNodesIDArray.push(node.id)
            }
        }
    })

    let filmsEdges = filmNodesIDArray.map((node, i, array) => {
        return { id: `${i}`, source: firstNode.id, target: node, animated: true }
    })

    let shipsEdges = filmNodesIDArray.map((node, i, array) => {
        return { id: `${node}`, source: filmNodesIDArray[i], target: shipsNodesIDArray[i], animated: true }
    }).filter(element => element !== undefined)

    let initEdges = filmsEdges.concat(shipsEdges)

    const rfStyle = {
        backgroundColor: 'teal',
    };

    return (
        <div style={{ height: '100%' }} className=" flex items-center justify-center container " data-testid="hero-flow" >
            {heroData ?
                <ReactFlow nodes={initNodes} edges={initEdges} nodeTypes={nodeTypes} fitView style={rfStyle}  >
                    <Background />
                    <Controls />
                </ReactFlow>
                : <></>}
        </div >
    );
}

export default Flow;
