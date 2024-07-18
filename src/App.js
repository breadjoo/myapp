// import logo from './logo.svg';
import './App.css';
import {useState} from 'react';

function Header(props){
  console.log('props',props.title)
  return (
    <header>
      {/* <h1><a href="/" onClick={function(event){ */}
        <h1><a href="/" onClick={(event)=>{
        event.preventDefault();
        props.onChangeMode();
      }}>{props.title}</a></h1>
    </header>
  )
}

function App() {
  const [mode, setMode] = useState('Welcome');
  const [id, setId] = useState(null);
  const [nextId, setNextId] = useState(4);
  const [topics, setTopics] = useState([
    {id:1, title:'html', body:'html is....'},
    {id:2, title:'CSS', body:'CSS is...'},
    {id:3, title:'JavaScript!', body:'JavaScript is ....'}
    ]);
    let content = null;
    if(mode === 'Welcome') {
      content=<Article title="Welcome" body="Hello,Web@@@"></Article>

    }else if(mode ==='READ') {
      let title, body = null;
      for (let i=0; i<topics.length;i++) {
        console.log(topics[i].id, id);
        if(topics[i].id === id) {
          title = topics[i].title;
          body = topics[i].body;
        }
      }
      content = <Article title={title} body={body}></Article>

    } else if (mode ==='create'){
      content = <Create onCreate={(title,body)=> {
        const newTopic = {id:nextId, title:title, body:body};
        const newTopics = [...topics]
        topics.push(newTopic);
        setTopics(topics);
        setMode('READ');
        setId(nextId);
        setNextId(nextId+1);

      }}></Create>
    }

  return (
    <div> 
      {/* <Header title="WEB" onChangeMode={function(){alert('Header'); */}
      <Header title="WEB" onChangeMode={()=>{
        setMode('Welcome');
      }}></Header>
        <Nav topics={topics} onChangeMode={(id)=>{
          setMode('READ');
          setId(id);
        }}>  </Nav>
        {content}      
        <a href='/create' onClick={event=>{
          event.preventDefault();
          setMode('create');
        }}>Create</a>
      
      
    </div>
  );
}

function Create(props) {
  return (
    <article>
      <h2>Create</h2>
      <form onSubmit={event=>{
        event.preventDefault();
        const title = event.target.title.value;
        const body = event.target.body.value;
        props.onCreate(title,body);
      }}>
        <p><input type='text' name='title' placeholder='title'></input></p>
        <p><textarea name='body' placeholder='body'></textarea></p>
        <p><input type='submit' value='Create'></input></p>
      </form>
    </article>
  )
}

function Article(props) {
  return (
    <article>
      <h2>{props.title}</h2>
      {props.body}
    </article> 
  )
}

function Nav(props) {
  const list = []
  for(let i=0; i<props.topics.length; i++){
    let t = props.topics[i];
    list.push(<li key={t.id}>
      <a id={t.id} href={'/read/'+t.id} onClick={event=>{
        event.preventDefault();
        props.onChangeMode(Number(event.target.id));
      }}>{t.title}</a></li>);
  }
  return (
    <nav>
      <ol>
        {list}
      </ol>
    </nav>

  )
}


export default App;
