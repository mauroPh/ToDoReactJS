//criar taskEntity em javascript
import { EntitySchema } from 'typeorm';

const TaskEntity = new EntitySchema({   
    name: 'Task',
    columns: {
        id: {
            primary: true,
            type: 'int',
            generated: true
        },
        description: {
            type: 'varchar'
        },
        completed: {
            type: 'boolean'
        }
    }
});

export default TaskEntity;
