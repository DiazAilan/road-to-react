import { DropResult, DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd"
import { User } from "./models/user"

interface UserListProps {
  users: User[],
  onDragEnd: (result: DropResult) => void
  dragItemStyle: {[key:string]: string}
  dragListStyle?: {[key:string]: string}
}

export const UserList = ({users = [], onDragEnd, dragItemStyle, dragListStyle}: UserListProps) => (
  <DragDropContext onDragEnd={onDragEnd}>
    <Droppable droppableId='droppable'>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.droppableProps}
          style={{
            ...(snapshot.isDraggingOver ? dragListStyle : {}),
          }}
        >
          {users.map((user, index) => (
            <Draggable key={user.id} index={index} draggableId={user.id}>
              {(provided, snapshot) => (
                <div
                  ref={provided.innerRef}
                  {...provided.draggableProps}
                  {...provided.dragHandleProps}
                  style={{
                    padding: '8px 16px',
                    ...provided.draggableProps.style,
                    ...(snapshot.isDragging ? dragItemStyle : {})
                  }}
                >
                  <UserItem user={user}></UserItem>
                </div> 
              )}
            </Draggable>
          ))}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  </DragDropContext>
)

const UserItem = ({user}: {user: User}) => (
  <div>{user.firstName} {user.lastName}</div>
)