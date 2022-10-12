import react, { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
//import { useFetch } from './hook/useFetch';
import axios from 'axios';
import { useQuery } from 'react-query'


type Repository = {
  full_name: string;
  name: string;
  language: string;
  description: string;
  fork: string;
}

function App() {
  const { data, isFetching } = useQuery<Repository[]>('repos', async () => {
    const response = await axios.get('https://api.github.com/users/joaocarlosa/repos')
    return response.data;
  })
  
  const [user, getUser] = useState("");
  const [repo, useRepo] = useState("");
  const [desc, useDescr] = useState("");
  const [lang, useLang] = useState(""); 


  const valor = data?.filter(val => val.full_name?.includes(repo) || val.language?.includes(lang));


  console.log(valor)
  
  return (
    
    <div className='App'>

      <ul>      
        <input placeholder="Usuário" value={user} onChange={(ev)=> getUser(ev.target.value)}/>
      </ul>
      
      <ul>      
        <input placeholder="Repositorio" value={repo} onChange={(ev)=> useRepo(ev.target.value)}/>
      </ul>
      <ul>
        <input placeholder="linguagem" value={lang} onChange={(ev)=> useLang(ev.target.value)}/>
      </ul>
      <ul>
        <input placeholder="linguagem" value={desc} onChange={(ev)=> useDescr(ev.target.value)}/>
      </ul>

      <ul>
        { valor?.map((data) =>(
          <div key={data.full_name}>
            <li>{data.full_name}</li>
            <p>{data.language}</p>
          </div>
        ))} 
      </ul>

    </div>
   

    /*
          
      <ul>
        
        { valor?.map((data) =>(
          <li key={data.full_name}>{data.full_name}</li>
        ))}  
             
      </ul>
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
    */
  )
}

export default App
