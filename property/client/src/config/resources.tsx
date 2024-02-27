import {
    AccountCircleOutlined,
    ChatBubbleOutline,
    PeopleAltOutlined,
    StarOutlineRounded,
    VillaOutlined,
    DashboardOutlined
  } from '@mui/icons-material';

import { IResourceItem } from "@refinedev/core";

export const resources: IResourceItem[] = [
    {
      name: "home",
      list: "/",
      meta: {
        label: "Dashboard",
        icon: <DashboardOutlined />,
      },
    },
    {
      name: "properties",
      list: "/properties",
      create: "/properties/create",
      edit: "/properties/edit/:id",
      show: "/property-detail",
      icon: <VillaOutlined />,
      meta: {
        canDelete: true,
      },
    },
    {
      name: "agent",
      icon: <PeopleAltOutlined />,
      meta: {
        canDelete: true,
      },
    },
    {
      name: "review",
      icon: <StarOutlineRounded />,
      meta: {
        canDelete: true,
      },
    },
    {
      name: "message",
      icon: <ChatBubbleOutline />,
      meta: {
        canDelete: true,
      },
    },
    {
      name: "my-profile",
      icon: <AccountCircleOutlined />,
      options: { label: 'My Profile'},
      meta: {
        canDelete: true,
      },
    },
  ]