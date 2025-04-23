function TaskFilter({ currentFilter, onFilterChange }) {
    try {
        const { theme } = React.useContext(ThemeContext);
        const [searchTerm, setSearchTerm] = React.useState('');
        const [showFilters, setShowFilters] = React.useState(false);
        const { tasks } = React.useContext(TaskContext);

        const filters = [
            { id: 'all', label: 'All Tasks', icon: 'fas fa-list', className: 'tab-all' },
            { id: 'today', label: 'Today', icon: 'fas fa-calendar-day', className: 'tab-today' },
            { id: 'upcoming', label: 'Upcoming', icon: 'fas fa-calendar-alt', className: 'tab-upcoming' },
            { id: 'completed', label: 'Completed', icon: 'fas fa-check-circle', className: 'tab-completed' },
            { id: 'pinned', label: 'Pinned', icon: 'fas fa-thumbtack', className: 'tab-pinned' }
        ];

        // Extract unique tags
        const allTags = React.useMemo(() => {
            const tags = new Set();
            tasks.forEach(task => {
                if (task.tags) {
                    task.tags.forEach(tag => tags.add(tag));
                }
            });
            return Array.from(tags);
        }, [tasks]);

        return (
            <div className="space-y-4 mb-6" data-name="task-filter">
                <div className="flex gap-2">
                    <div className="flex-1">
                        <input
                            type="text"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            placeholder="Search tasks..."
                            className="w-full p-2 rounded-lg border form-field form-field-title"
                            data-name="task-search-input"
                        />
                    </div>
                    <button
                        onClick={() => setShowFilters(!showFilters)}
                        className={`p-2 rounded-lg ${showFilters ? 'bg-blue-500 text-white' : ''}`}
                        data-name="toggle-filters-button"
                    >
                        <i className="fas fa-filter"></i>
                    </button>
                </div>

                <div className="grid grid-cols-5 gap-1">
                    {filters.map(filter => (
                        <button
                            key={filter.id}
                            onClick={() => onFilterChange(filter.id)}
                            className={`p-3 rounded-lg flex flex-col items-center justify-center gap-2
                                ${filter.className}
                                ${currentFilter === filter.id ? 'tab-active' : ''}`}
                            data-name={`filter-${filter.id}-button`}
                        >
                            <i className={`${filter.icon} text-xl`}></i>
                            <span className="text-sm font-medium">{filter.label}</span>
                        </button>
                    ))}
                </div>

                {showFilters && (
                    <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
                        <div className="space-y-4">
                            <div>
                                <h3 className="text-sm font-medium mb-2">Priority</h3>
                                <div className="flex gap-2">
                                    {['low', 'medium', 'high'].map(priority => (
                                        <button
                                            key={priority}
                                            onClick={() => onFilterChange(`priority-${priority}`)}
                                            className={`px-3 py-1 rounded-full text-sm capitalize
                                                ${currentFilter === `priority-${priority}` 
                                                    ? 'bg-blue-500 text-white' 
                                                    : 'bg-gray-100'}`}
                                            data-name={`filter-priority-${priority}-button`}
                                        >
                                            {priority}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {allTags.length > 0 && (
                                <div>
                                    <h3 className="text-sm font-medium mb-2">Tags</h3>
                                    <div className="flex flex-wrap gap-2">
                                        {allTags.map(tag => (
                                            <button
                                                key={tag}
                                                onClick={() => onFilterChange(`tag-${tag}`)}
                                                className={`px-3 py-1 rounded-full text-sm
                                                    ${currentFilter === `tag-${tag}`
                                                        ? 'bg-blue-500 text-white'
                                                        : 'bg-blue-100 text-blue-600'}`}
                                                data-name={`filter-tag-${tag}-button`}
                                            >
                                                #{tag}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        );
    } catch (error) {
        console.error('TaskFilter error:', error);
        reportError(error);
        return null;
    }
}
