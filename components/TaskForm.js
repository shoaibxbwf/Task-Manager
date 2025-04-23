function TaskForm({ editingTask, onEditComplete }) {
    try {
        const { addTask, updateTask } = React.useContext(TaskContext);
        const { theme } = React.useContext(ThemeContext);
        const [title, setTitle] = React.useState(editingTask?.title || '');
        const [description, setDescription] = React.useState(editingTask?.description || '');
        const [date, setDate] = React.useState(editingTask?.date || '');
        const [time, setTime] = React.useState('');
        const [showTimePicker, setShowTimePicker] = React.useState(false);
        const [priority, setPriority] = React.useState(editingTask?.priority || 'medium');
        const [reminder, setReminder] = React.useState(editingTask?.reminder || '');
        const [tags, setTags] = React.useState(editingTask?.tags?.join(',') || '');
        const [taskOption, setTaskOption] = React.useState(
            editingTask?.isPinned ? 'pinned' : editingTask?.isRecurring ? 'recurring' : ''
        );
        const [recurringFrequency, setRecurringFrequency] = React.useState(editingTask?.recurringFrequency || 'daily');

        // Set initial time state from editingTask if it exists
        React.useEffect(() => {
            if (editingTask?.time) {
                setTime(editingTask.time);
            }
        }, [editingTask]);

        const hours = Array.from({ length: 12 }, (_, i) => (i + 1).toString().padStart(2, '0'));
        const minutes = Array.from({ length: 60 }, (_, i) => i.toString().padStart(2, '0'));
        const periods = ['AM', 'PM'];

        const formatTimeDisplay = (timeStr) => {
            if (!timeStr) return '';
            const [hours24, minutes] = timeStr.split(':');
            const period = parseInt(hours24) >= 12 ? 'PM' : 'AM';
            const hours12 = (parseInt(hours24) % 12 || 12).toString().padStart(2, '0');
            return `${hours12}:${minutes} ${period}`;
        };

        const handleTimeSelect = (hours, minutes, period) => {
            let hours24 = parseInt(hours);
            if (period === 'PM' && hours24 !== 12) hours24 += 12;
            if (period === 'AM' && hours24 === 12) hours24 = 0;
            const timeString = `${hours24.toString().padStart(2, '0')}:${minutes}`;
            setTime(timeString);
            setShowTimePicker(false);
        };

        const handleSubmit = (e) => {
            e.preventDefault();
            if (!title.trim() || !date) return;

            const tagsList = tags.split(',').map(tag => tag.trim()).filter(Boolean);
            const taskData = {
                title: title.trim(),
                description,
                date,
                time,
                priority,
                reminder,
                tags: tagsList,
                isRecurring: taskOption === 'recurring',
                recurringFrequency: taskOption === 'recurring' ? recurringFrequency : null,
                isPinned: taskOption === 'pinned'
            };

            if (editingTask) {
                updateTask(editingTask.id, taskData);
                onEditComplete?.();
            } else {
                addTask({
                    ...taskData,
                    createdAt: new Date().toISOString()
                });
            }

            // Reset form
            setTitle('');
            setDescription('');
            setDate('');
            setTime('');
            setPriority('medium');
            setReminder('');
            setTags('');
            setTaskOption('');
            setRecurringFrequency('daily');
        };

        const reminderOptions = [
            { value: '15min', label: '15 minutes before' },
            { value: '1hour', label: '1 hour before' },
            { value: '1day', label: '1 day before' },
            { value: 'exact', label: 'At exact time' }
        ];

        return (
            <form 
                onSubmit={handleSubmit}
                className={`p-6 rounded-lg shadow-sm mb-6 ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}
                data-name="task-form"
            >
                {/* ... Rest of the form structure remains the same until the time picker ... */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-4">
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="Task title"
                            className="w-full p-3 rounded-lg form-field form-field-title"
                            data-name="task-title-input"
                        />

                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Task description"
                            className="w-full p-3 rounded-lg h-24 form-field form-field-description"
                            data-name="task-description-input"
                        />

                        <div className="grid grid-cols-2 gap-4">
                            <input
                                type="date"
                                value={date}
                                onChange={(e) => setDate(e.target.value)}
                                className="w-full p-3 rounded-lg form-field form-field-date"
                                data-name="task-date-input"
                            />
                            
                            <div className="time-picker-container">
                                <input
                                    type="text"
                                    value={formatTimeDisplay(time)}
                                    onClick={() => setShowTimePicker(!showTimePicker)}
                                    placeholder="Select time"
                                    className="w-full p-3 rounded-lg form-field form-field-time cursor-pointer"
                                    readOnly
                                    data-name="task-time-input"
                                />
                                {showTimePicker && (
                                    <div className="time-picker-dropdown">
                                        <div className="grid grid-cols-3 gap-2 p-4">
                                            <div className="time-picker-column">
                                                <div className="font-medium mb-2 text-center">Hour</div>
                                                <div className="space-y-1 max-h-48 overflow-y-auto">
                                                    {hours.map(hour => (
                                                        <div
                                                            key={hour}
                                                            onClick={() => handleTimeSelect(hour, minutes[0], 'AM')}
                                                            className="time-picker-option text-center"
                                                            data-name={`hour-${hour}`}
                                                        >
                                                            {hour}
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                            <div className="time-picker-column">
                                                <div className="font-medium mb-2 text-center">Minute</div>
                                                <div className="space-y-1 max-h-48 overflow-y-auto">
                                                    {minutes.map(minute => (
                                                        <div
                                                            key={minute}
                                                            onClick={() => handleTimeSelect(hours[0], minute, 'AM')}
                                                            className="time-picker-option text-center"
                                                            data-name={`minute-${minute}`}
                                                        >
                                                            {minute}
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                            <div className="time-picker-column">
                                                <div className="font-medium mb-2 text-center">Period</div>
                                                <div className="space-y-1">
                                                    {periods.map(period => (
                                                        <div
                                                            key={period}
                                                            onClick={() => handleTimeSelect(hours[0], minutes[0], period)}
                                                            className="time-picker-option text-center"
                                                            data-name={`period-${period}`}
                                                        >
                                                            {period}
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <select
                            value={priority}
                            onChange={(e) => setPriority(e.target.value)}
                            className="w-full p-3 rounded-lg form-field form-field-priority"
                            data-name="task-priority-select"
                        >
                            <option value="low">Low Priority</option>
                            <option value="medium">Medium Priority</option>
                            <option value="high">High Priority</option>
                        </select>

                        <input
                            type="text"
                            value={tags}
                            onChange={(e) => setTags(e.target.value)}
                            placeholder="Tags (comma separated)"
                            className="w-full p-3 rounded-lg form-field form-field-tags"
                            data-name="task-tags-input"
                        />

                        <div className="space-y-2">
                            <p className="text-sm font-medium">Task Options (Choose one)</p>
                            <div className="flex gap-2">
                                <button
                                    type="button"
                                    onClick={() => setTaskOption(taskOption === 'pinned' ? '' : 'pinned')}
                                    className={`option-button flex-1 ${taskOption === 'pinned' ? 'selected' : ''}`}
                                    data-name="pin-option-button"
                                >
                                    <i className="fas fa-thumbtack mr-2"></i>
                                    Pin Task
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setTaskOption(taskOption === 'recurring' ? '' : 'recurring')}
                                    className={`option-button flex-1 ${taskOption === 'recurring' ? 'selected' : ''}`}
                                    data-name="recurring-option-button"
                                >
                                    <i className="fas fa-sync-alt mr-2"></i>
                                    Recurring
                                </button>
                            </div>
                        </div>

                        {taskOption === 'recurring' && (
                            <select
                                value={recurringFrequency}
                                onChange={(e) => setRecurringFrequency(e.target.value)}
                                className="w-full p-3 rounded-lg form-field form-field-priority"
                                data-name="task-recurring-frequency-select"
                            >
                                <option value="daily">Daily</option>
                                <option value="weekly">Weekly</option>
                                <option value="monthly">Monthly</option>
                            </select>
                        )}

                        <div className="space-y-2">
                            <p className="text-sm font-medium">Reminder</p>
                            <div className="grid grid-cols-2 gap-2">
                                {reminderOptions.map(option => (
                                    <button
                                        key={option.value}
                                        type="button"
                                        onClick={() => setReminder(option.value)}
                                        className={`option-button ${reminder === option.value ? 'selected' : ''}`}
                                        data-name={`reminder-${option.value}-button`}
                                    >
                                        {option.label}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600"
                            data-name="add-task-button"
                        >
                            {editingTask ? 'Update Task' : 'Add Task'}
                        </button>
                    </div>
                </div>
            </form>
        );
    } catch (error) {
        console.error('TaskForm error:', error);
        reportError(error);
        return null;
    }
}
