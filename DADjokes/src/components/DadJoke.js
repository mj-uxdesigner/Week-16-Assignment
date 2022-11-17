// Icons
import { MdDeleteOutline } from 'react-icons/md';

import { 
    Card, 
    CardHeader, 
    CardContent, 
    IconButton, 
    Typography
} from '@material-ui/core';


const DadJoke = ({ joke, Delete }) => {

    return ( 
        <div>
           <Card elevation={3}>
               <CardHeader 
                    action={
                        <IconButton onClick={() => Delete(joke.id) }>
                            <MdDeleteOutline />
                        </IconButton>
                    }
                    title= {joke.title}
               />
               <CardContent>
                   <Typography variant='body2' color='textSecondary'>
                       {joke.joke}
                   </Typography>
               </CardContent>
           </Card>
        </div>
     );
}
 
export default DadJoke;