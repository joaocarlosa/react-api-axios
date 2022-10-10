import react, { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'




//import { useFetch } from './hook/useFetch';
import axios from 'axios';
import { useQuery } from 'react-query'


type Repository = {
  full_name: string;
  description: string;
  language: string;
}

function App() {
  const { data, isFetching } = useQuery<Repository[]>('repos', async () => {
    const response = await axios.get('https://api.github.com/users/johncarll/repos')
    return response.data;
  })

  const [name, useName] = useState("");
  const [description, useDescr] = useState("");

  return (

   

    <div>
      <input placeholder="Nome do Repositorio" onChange={event => useName(event.target.value)} />
      
      <input placeholder="Forked" onChange={event => useDescr(event.target.value)} />
      
      <ul>
        {
        data?.filter(post => {
          if (post.full_name.includes(name.toLowerCase())   ) {
            
            return post;
          }
        }).map(data=> {
          return (
            <div  key={data.full_name}>
              <strong>{data.full_name}</strong>
              <p>{data.description}</p>
              <p>{data.language}</p>
            </div>
          )
        })}
      </ul>
    </div>
  )
}

export default App
