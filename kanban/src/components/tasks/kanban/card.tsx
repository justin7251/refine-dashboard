
import { useDelete, useNavigation } from '@refinedev/core'

import { getDateColor } from '../../../utilities';
import { Text } from '../../../components/text'
import { TextIcon } from '../../../components/text-icon'

import { Button, Card, ConfigProvider, Dropdown, MenuProps, Space, Tag, Tooltip, theme } from 'antd'
import dayjs from 'dayjs'
import React, { memo, useMemo }  from 'react'

type ProjectCardProps = {
    id: string,
    title: string,
    updatedAt: string,
    dueDate?: string,
    users?: {
      id: string,
      name: string,
    //   avatarUrl?: User['avatarUrl']
    }[]
  }

const ProjectCard = ({ id, title, dueDate, users }: ProjectCardProps) => {
    const { token } = theme.useToken();
    const dueDateOptions = useMemo(() => {
        if(!dueDate) return null;
    
        const date = dayjs(dueDate);
    
        return {
          color: getDateColor({ date: dueDate}) as string,
          text: date.format('MMM DD')
        }
      }, [dueDate]);

    
    return (
        <ConfigProvider
        theme={{
            components: {
            Tag: {
                colorText: token.colorTextSecondary, 
            },
            Card: {
                headerBg: 'transparent',
            }
            }
        }}
        >
            <Card 
                size="small"
                title={<Text ellipsis={{tooltip: title}}>{title}</Text>}
                onClick={() => edit('tasks', id, 'replace')}

            >

            </Card>
        </ConfigProvider>
    )
}

export default ProjectCard