import { useState, useEffect } from 'react';
import ListaUsuarios from "./ListarUser";
import StatusAPI from './StatusAPI';

function App() {

  const [posts, setPosts] = useState([]);
  const [information, setInformation]= useState([]);
  const [usuario, setUsuario] = useState([]);
  const [user, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  
useEffect(() => {
   fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => res.json())
      .then((data) => setUsers(data));


  //Buscar Posts 
     const buscarPosts = async () => {
      const post = await fetch('https://jsonplaceholder.typicode.com/posts') 
      const data = await post.json()
     setPosts(data.slice(0, 10));
    };

    const buscarInfos = async () => {
      const infos = await fetch('https://jsonplaceholder.typicode.com/comments?postId=1') 
      const data = await infos.json()
     setInformation(data);
    }
    const buscarUser = async () =>{
      try{
      const user = await fetch('https://jsonplaceholder.typicode.com/users/5') 
      const data = await user.json()
      setUsuario(data)
    } finally{
        setLoading(false)
      }
    }
      
    buscarPosts() 
    buscarInfos()
    buscarUser()

  }, [])
 if (loading) {
    return <p>Carregando...</p>;
  }
 

  
  return (
    <>

    <div>
      <h1>Lista Usuarios</h1>
    <ListaUsuarios usuarios={user}/>  
    </div> 
    <StatusAPI/>
    
    </> 
  )
}



export default App
