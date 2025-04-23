function TaskList({ filter }) {
    try {
        const { tasks } = React.useContext(TaskContext);
        const { theme } = React.useContext(ThemeContext);
        const [editingTask, setEditingTask] = React.useState(null);

        const filteredTasks = React.useMemo(() => {
            // First, sort tasks by pinned status
            const sortedTasks = [...tasks].sort((a, b) => {
                if (a.isPinned && !b.isPinned) return -1;
                if (!a.isPinned && b.isPinned) return 1;
                return 0;
            });

            return sortedTasks.filter(task => {
                // Only show completed tasks in the completed tab
                if (filter === 'completed') return task.completed;
                if (task.completed) return false;

                if (filter === 'today') return isToday(task.date);
                if (filter === 'upcoming') return isUpcoming(task.date);
                if (filter === 'pinned') return task.isPinned;
                if (filter.startsWith('priority-')) {
                    const priority = filter.split('-')[1];
                    return task.priority === priority;
                }
                if (filter.startsWith('tag-')) {
                    const tag = filter.split('-')[1];
                    return task.tags && task.tags.includes(tag);
                }
                return true;
            });
        }, [tasks, filter]);

        if (editingTask) {
            return (
                <TaskForm 
                    editingTask={editingTask} 
                    onEditComplete={() => setEditingTask(null)}
                />
            );
        }

        if (filteredTasks.length === 0) {
            return (
                <div 
                    className={`text-center p-8 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}
                    data-name="empty-task-list"
                >
                    <i className="fas fa-tasks text-4xl mb-4"></i>
                    <p>No tasks found</p>
                </div>
            );
        }

        return (
            <div data-name="task-list">
                {filteredTasks.map(task => (
                    <TaskItem 
                        key={task.id} 
                        task={task}
                        onEdit={() => setEditingTask(task)}
                    />
                ))}
            </div>
        );
    } catch (error) {
        console.error('TaskList error:', error);
        reportError(error);
        return null;
    }
}
