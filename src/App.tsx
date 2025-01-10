import React, { ReactNode } from 'react';
import './App.scss'
import storiesMockup from './mockups/stories.json'

type ListProps = {
  list: Story[]
}

type InputWithLabelProps = {
  id: string
  label: string
  value: string
  type?: string
  onInputChange: (value: string) => void 
}

interface Story {
  id: number;
  title: string;
  url: string;
  author: string;
  numComments: number;
  points: number;
}

function useStorageState(key:string, initialState: string): [string, Function] {
  const [value, setValue] = React.useState(
    localStorage.getItem(key) ?? initialState
  ) 
    
  React.useEffect(() => {
    localStorage.setItem(key, value);
  }, [value, key])

  return [value, setValue]
}

const App = () => {

  const stories = storiesMockup

  const [searchTerm, setSearchTerm] = useStorageState('search', 'React')
  const [isButtonActive, setIsButtonActive] = React.useState(false)
  const [favoriteMascot, setFavoriteMascot] = React.useState('')
  const [isChecked, setIsChecked] = React.useState(false)

  function handleSearch(query: string): void {
    setSearchTerm(query);
  }

  function handleButtonClick(): void {
    setIsButtonActive(!isButtonActive);
  }

  function handleMascotChange(mascotType: 'cat' | 'dog' | 'tortoise'): void {
    setFavoriteMascot(mascotType)
  }

  function handleCheckbox(): void {
    setIsChecked(!isChecked)
  }

  const searchedStories = stories.filter(story => 
    story.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <h1>My Road to React</h1>
      
      <InputWithLabel
        id='search'
        label='Search'
        value={searchTerm}
        onInputChange={handleSearch}
      />

      <hr/>
      
      <List list={searchedStories}/>

      <Button onClick={handleButtonClick}>
        {isButtonActive ? 'Try again!' : 'Toggle me!'}
      </Button>

      <hr/>

      <RadioButton value={favoriteMascot === 'cat'} onToggle={() => handleMascotChange('cat')}>
        Cat
      </RadioButton>

      <RadioButton value={favoriteMascot === 'dog'} onToggle={() => handleMascotChange('dog')}>
        Dog
      </RadioButton>

      <RadioButton value={favoriteMascot === 'tortoise'} onToggle={() => handleMascotChange('tortoise')}>
        Tortoise
      </RadioButton>

      {favoriteMascot ? <p>Favorite Mascot: {favoriteMascot}</p> : null}

      <hr/>
      
      <Checkbox value={isChecked} onChange={handleCheckbox}>
        I'm checked? {String(isChecked)}
      </Checkbox>

    </>
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

const InputWithLabel = ({id, label, value, type = 'text', onInputChange}: InputWithLabelProps) => {

  return (
    <>
      <label htmlFor={id}>{label}: </label>
      <input
       id={id}
       type={type}
       value={value}
       onChange={event => onInputChange(event.target.value)}
      />
    </>
  )
}

interface ButtonProps {
  type?: 'button' | 'reset' | 'submit'
  onClick: () => void
  children: ReactNode
}

const Button = ({type = 'button', onClick, children, ...rest}: ButtonProps) => {
  return (
    <button type={type} onClick={onClick} {...rest}>
      {children}
    </button>
  )
}

interface RadioButtonProps {
  value: boolean;
  onToggle: () => void;
  children: ReactNode
} 

const RadioButton = ({value, children, onToggle}: RadioButtonProps) => {
  return (
    <label>
      <input type="radio" checked={value} onChange={onToggle}></input>
      {children}
    </label>
  )
}

interface CheckboxProps {
  value: boolean;
  onChange: () => void;
  children: ReactNode
} 

const Checkbox = ({value, children, onChange}: CheckboxProps) => {
  return (
    <label>
      <input type="checkbox" checked={value} onChange={onChange}></input>
      {children}
    </label>
  )
}

export default App
