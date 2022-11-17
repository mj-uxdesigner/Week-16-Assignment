// Icons
import { MdKeyboardArrowRight } from 'react-icons/md'

import { 
    Typography, 
    Button, 
    Container, 
    makeStyles,
    TextField
} from '@material-ui/core';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { db, auth } from '../firebaseConfig';
import {
    collection,
    addDoc
} from 'firebase/firestore'


// Style hook
const useStyles = makeStyles({
    field: {
        marginTop: 20,
        marginBottom: 20,
        display: 'block' 
    }
})

export const jokeCollectionRef = collection(db, 'Jokes')

const Create = () => {

    const classes = useStyles()
    const navigate = useNavigate()

    // Makes sure the user inputs aren't left blank
    const [ dadJoke, setDadJoke ] = useState('')
    const [ dadJokeTitle, setDadJokeTitle ] = useState('')

    const [ dadJokeError, setDadJokeError ] = useState(false)
    const [ dadJokeTitleError, setDadJokeTitleError ] = useState(false)
    
    
    

    // This is used to post to the database
    const handleSubmit = async (event) => {
        event.preventDefault()
        setDadJokeError(false)
        setDadJokeTitleError(false)

        if(dadJokeTitle && dadJoke == ''){
            setDadJokeError(true)
            setDadJokeTitleError(true)
        }

        if( dadJokeTitle && dadJoke ){
           await addDoc(jokeCollectionRef, {joke: dadJoke, title: dadJokeTitle, author: {email: auth.currentUser.email, id:auth.currentUser.uid}})
           navigate('/yourjokes')
        } 
    }


    return ( 
        <Container >
            <Typography
                variant='h6'
                color="textSecondary"
                component='h2'
                gutterBottom
            >
                Joke Creation
            </Typography>

            <form noValidate autoComplete="off" onSubmit={handleSubmit}>
                
                <TextField
                onChange= {(event) => setDadJokeTitle(event.target.value)}
                className={classes.field}
                label='Title'
                variant='outlined' 
                color='secondary'
                required
                error={dadJokeTitleError}
                />

                <TextField
                onChange= {(event) => setDadJoke(event.target.value)}
                className={classes.field}
                label='Dad Joke'
                variant='outlined' 
                color='secondary'
                multiline
                rows= {4}
                fullWidth
                required
                error={dadJokeError}
                />

                <Button
                    type='submit'
                    color='primary'
                    variant='contained'
                    endIcon={<MdKeyboardArrowRight color='white'/>}
                >
                    Submit
                </Button>
            </form>
            {/* Icons */}

        </Container>
     );
}
 
export default Create;