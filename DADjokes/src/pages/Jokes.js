import { useEffect, useState } from "react";
import { jokeCollectionRef } from "./Create";
import { auth, db } from "../firebaseConfig";

import { getDocs, doc, deleteDoc } from "firebase/firestore";
import { Container } from '@material-ui/core';
import DadJoke from "../components/DadJoke";
import Masonry from "react-masonry-css";


const Jokes = () => {

    const [ jokes, setJokes ] = useState([])

    useEffect(() => {

        const getJokes = async () => {
            const data = await getDocs(jokeCollectionRef);
            setJokes(data.docs.map((doc)=> ({...doc.data(), id: doc.id})))
        }

        getJokes()

    }, [])

    const handleDelete = async (id) => {
        const jokeDoc = doc(db, 'Jokes',id)
        await deleteDoc(jokeDoc)

        const changeJokes = jokes.filter(joke => joke.id != id)
        setJokes(changeJokes)
    }

    const breakpoints = {
        default: 3,
        1100: 2,
        700: 1
    }

    return (
        <Container>
            <Masonry
                breakpointCols={breakpoints}
                className = "my-masonry-grid"
                columnClassName="my-masonry-grid_column"
            >
                {jokes.map((joke) => {
                    if(joke.author.id === auth.currentUser.uid){
                    return(
                        <div item key={joke.id}>
                            <DadJoke joke={joke} Delete={handleDelete} />
                        </div>
                    )}}
                )}
            </Masonry>
        </Container> 
     );
}
 
export default Jokes;
