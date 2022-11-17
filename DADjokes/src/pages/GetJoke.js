import { useState } from "react";
import { jokeCollectionRef } from "./Create";
import { auth } from "../firebaseConfig";

import { 
    Container,
    Button,
    Typography
} from "@material-ui/core";
import { addDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";



const GetJoke = () => {

    const [ dadJoke, setDadJoke ] = useState('')

    const [ user, setUser ] = useState({})

    onAuthStateChanged(auth, (currentUser) => {
        setUser(currentUser)
    })

    const buttonFunction = () => {
        if(user){
            return(
                <Button
                onClick={() => {handleSave(dadJoke.joke)}}
                color='secondary'
            >
                Save Joke
            </Button>
            )
        }
    }

    const handlePost = () => {
        fetch('https://icanhazdadjoke.com/',{
            headers: {
                'Accept': 'application/json'
            }
        }).then(response => response.json())
        .then(data => setDadJoke(data))

    }

    const handleSave = async (savedjoke) => {
        await addDoc(jokeCollectionRef, {joke: savedjoke, title: 'Dad Joke' ,
            author: {email: auth.currentUser.email, id:auth.currentUser.uid}})
    }

    return ( 
        <Container>
           
            <Typography 
                variant="h6" 
                color="textsecondary"
            >
                {dadJoke.joke}
            </Typography>
                
                 
            
            <Button
                onClick={handlePost}
                color='secondary'
            >
                Get Joke
            </Button>
            
            {buttonFunction()}
            

            
        </Container>
     );
}
 
export default GetJoke;