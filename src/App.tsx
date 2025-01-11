import { cloneElement, ReactElement, ReactNode, useEffect, useState } from 'react';
import './App.scss';
import storiesMockup from './mockups/stories.json';
import usersMockup from './mockups/users.json';
import { Story } from './models/story';
import { User } from './models/user';
import { DragDropContext, Draggable, Droppable, DropResult } from '@hello-pangea/dnd';

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

function useStorageState(key:string, initialState: string): [string, Function] {
  const [value, setValue] = useState(
    localStorage.getItem(key) ?? initialState
  ) 
    
  useEffect(() => {
    localStorage.setItem(key, value);
  }, [value, key])

  return [value, setValue]
}

const App = () => {

  const stories: Story[] = storiesMockup

  const [searchTerm, setSearchTerm] = useStorageState('search', 'React')
  const [isButtonActive, setIsButtonActive] = useState(false)
  const [favoriteMascot, setFavoriteMascot] = useState('')
  const [isChecked, setIsChecked] = useState(false)
  const [users, setUsers] = useState<User[]>(usersMockup)

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

  function handleDropdownElementSelection(index: number): void {
    console.log(`${index} selected`)
  }

  function handleDragUser(info: {destination: {index: number}, source: {index: number}}): void {
    if (info.destination) {
      setUsers(reorderList(users, info.source.index, info.destination.index))
    }
  }
  
  function reorderList(list: any[], startIndex: number, endIndex: number): any[] {
    const output = Array.from(list);
    const [removed] = output.splice(startIndex, 1);

    output.splice(endIndex, 0, removed);

    return output;
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

      <hr/>

      <Dropdown
        onClickItem={handleDropdownElementSelection}
        triggerLabel='Dropdown'
        menu={[
          <button>Menu 1</button>,
          <button>Menu 2</button>
        ]}
      />

      <hr/>

      <UserList users={users} onDragEnd={handleDragUser}/>
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

interface DropdownProps {
  onClickItem: (index: number) => void;
  triggerLabel: string;
  menu: ReactElement[];
}

const Dropdown = ({onClickItem, menu, triggerLabel}: DropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);

  function handleOpen(): void {
    setIsOpen(!isOpen)
  }

  return (
    <div className='dropdown'>
      <button onClick={handleOpen}>{triggerLabel}</button>
      {isOpen
        ? <ul className="menu">
            {menu.map((menuItem, index) => (
              <li key={index} className="menu-item" onClick={() => onClickItem(index)}>
                {cloneElement(menuItem, {
                  onClick: () => setIsOpen(false)               
                })}
              </li>
            ))}
          </ul>
        : null}
    </div>
  )
}

interface UserListProps {
  users: User[],
  onDragEnd: () => void
}

const UserList = ({users = [], onDragEnd}: UserListProps) => (
  <DragDropContext onDragEnd={onDragEnd}>
    <Droppable droppableId='droppable'>
      {(provided) => (
        <div ref={provided.innerRef} {...provided.droppableProps}>
          {users.map((user, index) => (
            <Draggable key={user.id} index={index} draggableId={user.id}>
              {provided => (
                <div
                  ref={provided.innerRef}
                  {...provided.draggableProps}
                  {...provided.dragHandleProps}
                >
                  {user.firstName} {user.lastName}
                </div> 
              )}
            </Draggable>
          ))}
        </div>
      )}
    </Droppable>
  </DragDropContext>
)

const User = (user: User) => (
  <div>{user.firstName} {user.lastName}</div>
)

export default App
