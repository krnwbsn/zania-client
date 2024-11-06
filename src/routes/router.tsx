import { createBrowserRouter } from 'react-router-dom';
import { Home } from 'containers/Home';
import { TaskManagement } from 'containers/TaskManagement';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/task-management',
    element: <TaskManagement />,
  },
]);

export { router };
