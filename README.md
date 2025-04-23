# Task Manager App

A modern task management application built with React and TailwindCSS.

## Features

- Create, edit, and delete tasks
- Set task priorities and due dates
- Filter tasks by various criteria
- Dark/Light theme support
- Task categories and tags
- Responsive design
- Local storage persistence

## Live Demo

You can view the live demo [here](https://[your-github-username].github.io/task-manager/)

## Installation & Deployment

1. Clone the repository:
   bash
   git clone https://github.com/[your-github-username]/task-manager.git
   cd task-manager
   

2. Open `index.html` in your browser to run locally

3. To deploy to GitHub Pages:
   - Go to your repository settings
   - Navigate to "Pages" section
   - Select "main" branch as source
   - Save the changes

## Project Structure


task-manager/
├── components/
│   ├── TaskItem.js
│   ├── TaskList.js
│   ├── TaskForm.js
│   ├── TaskFilter.js
│   └── Navbar.js
├── context/
│   ├── ThemeContext.js
│   └── TaskContext.js
├── pages/
│   ├── Home.js
│   └── Settings.js
├── utils/
│   ├── storage.js
│   └── dateUtils.js
├── styles/
│   ├── main.css
│   └── components.css
├── index.html
└── app.js


## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
