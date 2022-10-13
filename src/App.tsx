import { useState } from 'react'
import axios from 'axios';
import { useQuery } from 'react-query'
import { format } from 'date-fns';
import { parseISO } from 'date-fns/esm';
import ptBR from 'date-fns/esm/locale/pt-BR/index.js';
import  {ListGroup, Form } from 'react-bootstrap';
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
    });
  }
  
  const [user, getUser] = useState("joaocarlosa");
  const [checked, setCheck] = useState(false);
  const [repo, useRepo] = useState("");
  const [lang, useLang] = useState(""); 
  
  function toggle(){
    setCheck(!checked)
  }
  
  const url = `https://api.github.com/users/${user}/repos`;

  const { data } = useQuery<Repository[]>('repos', async () => {
    const response = await axios.get(url)
    return response.data;    
  },{
    staleTime: 1000,
  })  
  
  const lowerRepo = repo.toLowerCase();
  const lowerLang = lang.toLowerCase();  

  var filter = data
    
    if(lowerRepo != '' && lowerLang != ''){
      filter = data?.filter(val => (    
      val.description?.toLowerCase().includes(lowerRepo)) && val.language?.toLowerCase().includes(lowerLang));
    }
    else if(lowerRepo != ''){
      filter = data?.filter(val => (    
      val.name?.toLowerCase().includes(lowerRepo)) || val.description?.toLowerCase().includes(lowerRepo));
    }
    else if(lowerLang != ''){
      filter = data?.filter(val => (    
      val.language?.toLowerCase().includes(lowerLang)));
    }

    else if(checked){
      filter = data?.filter(val => (    
        val.archived.valueOf()));
    }

  return (    
    <div className='App'>
      <ul></ul>
      <div className="container text-center">
        <div className="row">
          <div className="col">
          <label className="form-label">Usuário</label>
            <input className="form-control" placeholder="Usuário" value={user} onChange={(ev)=> getUser(ev.target.value)}/>
          </div>
          <div className="col">
          <label className="form-label">Repositório</label>
            <input className="form-control" placeholder="Repositórios" value={repo} onChange={(ev)=> useRepo(ev.target.value)}/>
          </div>
          <div className="col">
          <label className="form-label">Linguagem</label>
            <input className="form-control" placeholder="Linguagem" value={lang} onChange={(ev)=> useLang(ev.target.value)}/>
          </div> 

          <div className="col">
          <label className="form-label"></label>
            <Form.Group>
              <Form.Check type="checkbox" label="Arquivado"  onClick={toggle} />
            </Form.Group>  
          </div> 
        </div>
      </div>
      <ul></ul>     
             
        { filter?.map((data) =>(
          <ul>
          <ListGroup >
            <ListGroup.Item>
            <div className="container text-right ms-2 me-auto">
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
              <label className="form-label">{data.archived}</label>              
            </div>
            </ListGroup.Item>
          </ListGroup>
          </ul>
        ))}         
    </div>    
  ) 
}

export default App
