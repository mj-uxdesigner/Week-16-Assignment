import { useEffect, useState } from "react";
import { db } from '../firebaseConfig';
import { 
    collection, 
    getDocs,
    addDoc, 
    updateDoc,
    doc
} from 'firebase/firestore';


const FireDataBase = () => {
    const [ firstName, setFirstName ] = useState('')
    const [ lastName, setLastName ] = useState('')

    const [ users, setUsers ] = useState([])
    const usersCollectionRef = collection(db, 'users')

    const createUser = async() => {
        await addDoc(usersCollectionRef, {first: firstName, last_name: lastName})
    }

    const updateUser = async(id, first_name, last_name) => {
        const userDoc = doc(db, 'users',id)
        const newFields = {last_name: 'Elijah'}
        await updateDoc(userDoc, newFields)
    }

    useEffect(() => {

        const getUsers = async () => {
            const data = await getDocs(usersCollectionRef);
            setUsers(data.docs.map((doc)=> ({...doc.data(), id: doc.id})))
        }

        getUsers()

    }, [])


    return ( 
        <div>
            <input placeholder="First Name.." onChange={(event) => {setFirstName(event.target.value)}} />
            <input placeholder="Last Name.." onChange={(event) => {setLastName(event.target.value)}}/>

            <button onClick={createUser}>Create User</button>
            
            {users.map((user) => {
                return (
                <div>
                    <h1>First: {user.first_name}</h1>
                    <h1>Last: {user.last_name}</h1>
                    <button onClick={() => {updateUser(user.id, user.lastName, user.firstName)}}>Change Name</button>
                    {/* <button onClick={() => {deleteUser(user.id)}}>Delete User</button> */}
                </div>
                )
            })}
        </div>
     );
}
 
export default FireDataBase;