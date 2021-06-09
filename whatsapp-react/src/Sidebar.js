import React from 'react'
import './Sidebar.css'
import DonutLargeIcon from '@material-ui/icons/DonutLarge'
import {Avatar,IconButton} from '@material-ui/core'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import {SearchOutlined} from '@material-ui/icons'
import ChatIcon from '@material-ui/icons/Chat'
import SidebarChat from './SidebarChat'

const Sidebar = () => {
    return (
        <div className="sidebar">
         
        
        <div className="sidebar__header">
        <Avatar src="https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260" />
            <div className="sidebar__headerRight">
            <IconButton >
            <DonutLargeIcon />
            </IconButton>
            <IconButton >
            <MoreVertIcon />
            </IconButton>
            <IconButton >
            <ChatIcon />
            </IconButton>
            </div>
        </div>

        <div className="sidebar__search">
            <div className="sidebar__searchContainer">
            <SearchOutlined />
            <input placeholder="search" type="text" />
            </div>
        </div>

        <div className="sidebar__chats">
            <SidebarChat />
            <SidebarChat />
            <SidebarChat />
        </div>

        </div>
    )
}

export default Sidebar
