function TaskItem({ task }) {
    try {
        const { updateTask, deleteTask } = React.useContext(TaskContext);
        const { theme } = React.useContext(ThemeContext);
        const [isExpanded, setIsExpanded] = React.useState(false);

        const toggleComplete = () => {
            updateTask(task.id, { completed: !task.completed });
        };

        const togglePin = () => {
            updateTask(task.id, { isPinned: !task.isPinned });
        };

        return (
            <div 
                data-name="task-item"
                className={`task-item p-4 mb-3 rounded-lg shadow-sm
                    ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}
                    ${task.completed ? 'completed' : ''}
                    priority-${task.priority}`}
            >
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <input
                            type="checkbox"
                            checked={task.completed}
                            onChange={toggleComplete}
                            className="w-5 h-5 rounded"
                            data-name="task-checkbox"
                        />
                        <div>
                            <div className="flex items-center gap-2">
                                <h3 className={`text-lg ${task.completed ? 'line-through' : ''}`}>
                                    {task.title}
                                </h3>
                                {task.isPinned && (
                                    <i className="fas fa-thumbtack text-blue-500"></i>
                                )}
                            </div>
                            <div className="flex items-center gap-2 text-sm text-gray-500">
                                <span>{formatDate(task.date)}</span>
                                {task.time && <span>at {task.time}</span>}
                                {task.isRecurring && (
                                    <span className="italic">
                                        (Repeats {task.recurringFrequency})
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="flex gap-2">
                        <button
                            onClick={togglePin}
                            className={`p-2 rounded hover:bg-gray-100 ${
                                task.isPinned ? 'text-blue-500' : ''
                            }`}
                            data-name="pin-task-button"
                        >
                            <i className="fas fa-thumbtack"></i>
                        </button>
                        <button
                            onClick={() => setIsExpanded(!isExpanded)}
                            className="p-2 rounded hover:bg-gray-100"
                            data-name="expand-task-button"
                        >
                            <i className={`fas fa-chevron-${isExpanded ? 'up' : 'down'}`}></i>
                        </button>
                        <button
                            onClick={() => updateTask(task.id, { editing: true })}
                            className="p-2 rounded hover:bg-gray-100"
                            data-name="edit-task-button"
                        >
                            <i className="fas fa-edit"></i>
                        </button>
                        <button
                            onClick={() => deleteTask(task.id)}
                            className="p-2 rounded hover:bg-gray-100 text-red-500"
                            data-name="delete-task-button"
                        >
                            <i className="fas fa-trash"></i>
                        </button>
                    </div>
                </div>

                {isExpanded && (
                    <div className="mt-4 space-y-3">
                        {task.description && (
                            <div className="text-sm">
                                <p className="whitespace-pre-wrap">{task.description}</p>
                            </div>
                        )}
                        
                        {task.tags && task.tags.length > 0 && (
                            <div className="flex gap-2">
                                {task.tags.map(tag => (
                                    <span
                                        key={tag}
                                        className="px-2 py-1 text-xs rounded bg-blue-100 text-blue-600"
                                    >
                                        #{tag}
                                    </span>
                                ))}
                            </div>
                        )}

                        {task.reminders && task.reminders.length > 0 && (
                            <div className="text-sm text-gray-500">
                                <p>Reminders:</p>
                                <ul className="list-disc ml-4">
                                    {task.reminders.map(reminder => (
                                        <li key={reminder}>
                                            {reminder === '15min' && '15 minutes before'}
                                            {reminder === '1hour' && '1 hour before'}
                                            {reminder === '1day' && '1 day before'}
                                            {reminder === 'exact' && 'At exact time'}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                )}
            </div>
        );
    } catch (error) {
        console.error('TaskItem error:', error);
        reportError(error);
        return null;
    }
}
