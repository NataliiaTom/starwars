import React, { memo } from 'react';
import { Handle, Position } from '@xyflow/react';

function customNode({ data }) {
    return (
        <div className="px-0.5 py-2 shadow-md rounded-md bg-white border-2 border-stone-400">
            <div className="flex">
                <div className="ml-1">
                    <div className="text-lg font-bold">{data.label}</div>
                </div>
                <div className="ml-0.5">
                    <div className="text-lg font-bold">{data.emoji}</div>
                </div>
            </div>
            <Handle
                type="target"
                position={Position.Top}
                className="w-16 !bg-teal-500"
            />
            <Handle
                type="source"
                position={Position.Bottom}
                className="w-16 !bg-teal-500"
            />
        </div>
    );
}

export default memo(customNode);