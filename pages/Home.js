function Home() {
    try {
        const [currentFilter, setCurrentFilter] = React.useState('all');

        return (
            <div className="container mx-auto px-4 pt-20" data-name="home-page">
                <TaskForm />
                <TaskFilter 
                    currentFilter={currentFilter}
                    onFilterChange={setCurrentFilter}
                />
                <TaskList filter={currentFilter} />
            </div>
        );
    } catch (error) {
        console.error('Home page error:', error);
        reportError(error);
        return null;
    }
}
