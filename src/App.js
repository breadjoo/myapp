// import logo from './logo.svg';
import './App.css';

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

  const topics = [
    {id:1, title:'html', body:'html is....'},
    {id:2, title:'CSS', body:'CSS is...'},
    {id:3, title:'JavaScript!', body:'JavaScript is ....'}
    ]

  return (
    <div>
      {/* <Header title="WEB" onChangeMode={function(){alert('Header'); */}
      <Header title="WEB" onChangeMode={()=>{
        alert('Header');   
      }}></Header>
        <Nav topics={topics} onChangeMode={(id)=>{
          alert(id);
        }}>  </Nav>
          <Article title="welcome" body="Hello, Web"></Article>
      
      
    </div>
  );
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
        props.onChangeMode(event.target.id);
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
