import react, { useState } from 'react'
//import { useFetch } from './hook/useFetch';
import axios from 'axios';
import { useQuery } from 'react-query'
import { format } from 'date-fns';
import { parseISO } from 'date-fns/esm';
import ptBR from 'date-fns/esm/locale/pt-BR/index.js';
import  {Button, ListGroup, Table } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'

type Repository = {  
  archived: boolean;
  full_name: string;
  name: string;
  language: string;
  description: string;
  html_url: string;
  fork: boolean;
  created_at: string;
  updated_at: string;
  pushed_at: string;
}




function App() {

  const formatDate = (date: string) => {
    return format(parseISO(date), "dd/MM/yyyy", {
      locale: ptBR,
    }
    );
  }
  

  
  const [user, getUser] = useState("joaocarlosa");
  const [repo, useRepo] = useState("");
  
        

  const url = `https://api.github.com/users/${user}/repos`;

  const { data } = useQuery<Repository[]>('repos', async () => {
    const response = await axios.get(url)
    console.log('nova chamada')
    return response.data;    
  },{
    staleTime: 1000*60,
  })

  console.log(data);
 

  
  const lowerRepo = repo.toLowerCase();

  const filter = data?.filter(val => val.description?.toLowerCase().includes(lowerRepo));


  
  return (
    
    <div className='App'>

      <div className="container text-center">
        <div className="row">
          <div className="col">
          <label className="form-label">Buscar por nome do usuário</label>
            <input className="form-control" placeholder="Usuário" value={user} onChange={(ev)=> getUser(ev.target.value)}/>
          </div>
          <div className="col">
          <label className="form-label">Buscar no repositório</label>
            <input className="form-control" placeholder="Busca" value={repo} onChange={(ev)=> useRepo(ev.target.value)}/>
          </div>
          
        </div>
      </div>
      

      <>
        
        { filter?.map((data) =>(
          <ul>
          <ListGroup >
            <ListGroup.Item>
            <div className="text-right ms-2 me-auto">
              <label className="form-label">{formatDate(data.created_at)}</label>
            </div>
            <div className="text-right ms-2 me-auto">
              <div className="row">
                <div className="col">
                  <a href={data.html_url} className="fw-bold">{data.full_name}</a>
                  
                </div>
                <div className="col">
                  <label className="form-label">{data.description}</label>
                </div>
                          
              </div>
            </div>
            <div className="ms-2 me-auto">
              <label className="form-label">{data.language}</label>
            </div>

            <div className="ms-2 me-auto">
              
              
            </div>
            
            </ListGroup.Item>
          </ListGroup>
          </ul>

        ))} 
      </>      

    </div>
    
  )

  
}

export default App
