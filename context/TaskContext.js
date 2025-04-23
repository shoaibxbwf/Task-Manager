const TaskContext = React.createContext();

function TaskProvider({ children }) {
    try {
        const [tasks, setTasks] = React.useState(getFromStorage('tasks') || []);
        const [settings, setSettings] = React.useState(getFromStorage('settings') || {
            notifications: true,
            taskPersistDays: 30,
            theme: 'light'
        });

        React.useEffect(() => {
            saveToStorage('tasks', tasks);
        }, [tasks]);

        React.useEffect(() => {
            saveToStorage('settings', settings);
        }, [settings]);

        const addTask = (task) => {
            setTasks(prev => [...prev, { ...task, id: Date.now(), completed: false }]);
        };

        const updateTask = (id, updates) => {
            setTasks(prev => prev.map(task => 
                task.id === id ? { ...task, ...updates } : task
            ));
        };

        const deleteTask = (id) => {
            setTasks(prev => prev.filter(task => task.id !== id));
        };

        const updateSettings = (newSettings) => {
            setSettings(prev => ({ ...prev, ...newSettings }));
        };

        return (
            <TaskContext.Provider value={{
                tasks,
                settings,
                addTask,
                updateTask,
                deleteTask,
                updateSettings
            }}>
                {children}
            </TaskContext.Provider>
        );
    } catch (error) {
        console.error('Task provider error:', error);
        reportError(error);
        return null;
    }
}
