// Icons
import { 
    MdOutlineChildFriendly,
    MdDirectionsRun,
    MdSavings,
    MdSentimentSatisfiedAlt,
    MdLogin,
    MdPointOfSale
} from 'react-icons/md'
import { VscPerson } from 'react-icons/vsc'

import { auth } from '../firebaseConfig'
import { useState } from "react";

import { 
    makeStyles,
    Drawer,
    Typography,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    AppBar,
    Toolbar,
    Avatar,
    Button
} from "@material-ui/core";
import { useLocation, useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { onAuthStateChanged, signOut } from "firebase/auth";







const drawerWidth = 240

const useStyles = makeStyles((theme) => {
    return {
        page: {
            background: '#f9f9f9',
            width: '100%',
            padding: theme.spacing(3)
        },
        drawer: {
            width: drawerWidth
        },
        drawerPaper: {
            width: drawerWidth
        },
        root: {
            display: 'flex'
        },
        active: {
            background: '#f4f4f4'
        },
        title: {
            padding: theme.spacing(2)
        },
        appbar: {
            width: `calc(100% - ${drawerWidth}px)` 
        },
        toolbar: theme.mixins.toolbar,
        date: {
            flexGrow: '1'
        },
        avatar: {
            marginLeft: theme.spacing(2)
        }
    }
})

// The layout is the parent to the pages
const Layout = ({children}) => {

    const classes = useStyles()
    const navigate = useNavigate()
    const location = useLocation()

    const [ user, setUser ] = useState({})

    onAuthStateChanged(auth, (currentUser) => {
        setUser(currentUser)
    })

    const logout = async () => {

        await signOut(auth)
    };

    const logInLogOut = () => {
        if(user){
            return loggedInMenuItems
        }else if(!user){
            return loggedOutMenuItems
        }
    }


    const loggedOutMenuItems = [
        {
            text: 'Get Joke',
            icon: <MdSentimentSatisfiedAlt />,
            path: '/'
        },
        {
            text: 'Sign Up',
            icon: <MdPointOfSale />,
            path: '/signup'
        },
        {
            text: 'Sign In',
            icon: <MdLogin />,
            path: '/signin'
        }
    ]

    const loggedInMenuItems = [
        {
            text: 'My Jokes',
            icon: <MdSavings />,
            path: '/yourjokes'
        },
        {
            text: 'Create Joke',
            icon: <MdOutlineChildFriendly />,
            path: '/create'
        },
        {
            text: 'Get Joke',
            icon: <MdSentimentSatisfiedAlt />,
            path: '/'
        },
        {
            text: '',
            icon: <Button endIcon={<MdDirectionsRun />} onClick={logout}>Logout</Button>,
            path: '/'
        }
    ]

    return (
        <div className={classes.root}>

            <AppBar
                className={classes.appbar}
                elevation={0}
            >
                <Toolbar>
                    <Typography className={classes.date}>
                        Today is the {format(new Date(), 'do MMMM Y')}
                    </Typography>
                    
                    <Typography>
                      {user?.email}  
                    </Typography>
                    
                    
                    <Avatar src="" className = {classes.avatar} />
                </Toolbar>
            </AppBar>

            <Drawer 
                className={classes.drawer}
                variant="permanent"
                anchor="left"
                classes={{ paper: classes.drawerPaper }}
            >
        

                <div>
                    <Typography variant="h5" className={classes.title}>
                        <Button 
                            variant='contained' 
                            color='primary'
                            style={{fontSize: '25px'}}
                            endIcon={<VscPerson color='white' />}>DAD</Button>
                        <span> jokes</span>
                    </Typography>
                    
                </div>

            
                <List>
                    {logInLogOut().map(item =>(
                        <ListItem 
                            button
                            key={item.text}
                            onClick={() => navigate(item.path)}
                            className={location.pathname == item.path ? classes.active : null}
                        >
                            <ListItemIcon>{item.icon}</ListItemIcon>
                            <ListItemText primary={item.text}></ListItemText>
                        </ListItem>
                    ))}
                </List>

            </Drawer>
            <div className={classes.page}>
                <div className={classes.toolbar}></div>
                { children }
            </div>
        </div>
     );
}
 
export default Layout;