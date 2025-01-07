import React from 'react';
import './App.scss'
import storiesMockup from './mockups/stories.json'

type ListProps = {
  list: Story[]
}

type SearchProps = {
  search: string
  onSearch: (query: string) => void 
}

interface Story {
  id: number;
  title: string;
  url: string;
  author: string;
  numComments: number;
  points: number;
}

const App = () => {

  const stories = storiesMockup

  const [searchTerm, setSearchTerm] = React.useState(
    localStorage.getItem('search') || 'React'
  )

  function handleSearch(query: string): void {
    setSearchTerm(query)

    localStorage.setItem('search', query);
  }

  const searchedStories = stories.filter(story => 
    story.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <h1>My Road to React</h1>
      
      <Search search={searchTerm} onSearch={handleSearch}/>

      <hr/>
      
      <List list={searchedStories}/>
      
    </div>
    )
  }

const List = ({list}: ListProps) => (
  <ul>
      {list.map(item => (
        <ListItem item={item} key={item.id}/>
      ))}
    </ul>
)

const ListItem = ({item}: {item: Story}) => (
  <li>
    <span>
      <a href={item.url}>{item.title} - {item.author}</a>
    </span>
    <span> | {item.numComments} comments</span>
    <span> | {item.points} points</span>
  </li>
)

const Search = ({search, onSearch}: SearchProps) => {

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    onSearch(event.target.value)
  }

  function handleBlur(event: React.ChangeEvent<HTMLInputElement>) {
    console.log(event)
  }

  return (
    <div>
      <label htmlFor='search'>Search: </label>
      <input id='search' type='text' onChange={handleChange} onBlur={handleBlur} value={search}/>
    </div>
  )
}

export default App
