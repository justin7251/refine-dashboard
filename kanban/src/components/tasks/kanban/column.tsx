import { useDroppable } from '@dnd-kit/core'
import React from 'react'

import { Badge, Button, Skeleton, Space } from "antd";
import { Text } from "../../../components";

const KanbanColumn = () => {
    const {isOver, setNodeRef, active } = useDroppable({
        id: '',
        data: ''
    });

    return (
        <div
            ref={setNodeRef}
            style={{
                display: 'flex',
                flexDirection: 'column',
                padding: '0 16px'
            }}
        >
            <div style={{ padding: '12px' }}>
                <Space style={{ width: '100%', justifyContent: 'space-between'}}>
                    <Space>
                        <Text
                            ellipsis={{ tooltip: 'Titlte To Do'}}
                            size="xs"
                            strong
                            style={{
                                textTransform: 'uppercase',
                                whiteSpace: 'nowrap'
                            }}
                        >
                            Title
                        </Text>
                    </Space>
                </Space>
            </div>

        </div>
    )
}

export default KanbanColumn