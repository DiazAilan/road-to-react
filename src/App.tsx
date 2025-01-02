import './App.scss'

interface ListItem {
  id: number;
  title: string;
  url: string;
  author: string;
  numComments: number;
  points: number;
}

const list = [
  {
    id: 0,
    title: 'React',
    url: 'https://reactjs.org/',
    author: 'Jordan Walke',
    numComments: 3,
    points: 4,
  },
  {
    id: 1,
    title: 'Redux',
    url: 'https://redux.js.org/',
    author: 'Dan Abramov, Andrew Clark',
    numComments: 2,
    points: 5,
  },
  {
    id: 2,
    title: 'RxJS',
    url: 'https://rxjs.dev/',
    author: 'Unknown',
    numComments: 4,
    points: 3,
  },
]

const anotherList = [
  {
    id: 0,
    title: 'React',
    url: 'https://reactjs.org/',
    author: 'Jordan Walke',
    numComments: 3,
    points: 4,
  },
  {
    id: 1,
    title: 'RxJS',
    url: 'https://rxjs.dev/',
    author: 'Unknown',
    numComments: 4,
    points: 3,
  },
]

function App() {
  return (
    <div>
      <h1>My Road to React</h1>
      
      <Search/>

      <hr/>
      
      <List list={list}/>

      <hr/>

      <List list={anotherList}/>
      
    </div>
  );
}

function List({list}: {list: ListItem[]}) {
  return (
    <ul>
        {list.map(item => {
          return (
            <ListItem item={item} key={item.id}/>
          );
        })}
      </ul>
  )
}

function ListItem({item}: {item: ListItem}) {
  return (
    <li>
      <span>
        <a href={item.url}>{item.title} - {item.author}</a>
      </span>
      <span> | {item.numComments} comments</span>
      <span> | {item.points} points</span>
    </li>
  )
}


function Search() {
  return (
    <div>
      <label htmlFor='search'>Search: </label>
      <input id='search' type='text'/>
    </div>
  )
}

export default App
