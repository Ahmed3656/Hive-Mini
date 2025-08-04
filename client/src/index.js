import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from 'react-router-dom';

import './index.css';

import { App, Surveys, ErrorPage } from './app/';
import { ToastProvider } from './components/ui/Toast';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Navigate to="/survey" replace /> },
      { path: 'survey', element: <Surveys /> },
      {
        path: 'contacts',
        element: (
          <div className="p-6">
            <h1 className="text-2xl font-semibold">Contacts</h1>
          </div>
        ),
      },
      {
        path: 'themes',
        element: (
          <div className="p-6">
            <h1 className="text-2xl font-semibold">Themes</h1>
          </div>
        ),
      },
      {
        path: 'invitations',
        element: (
          <div className="p-6">
            <h1 className="text-2xl font-semibold">Invitations</h1>
          </div>
        ),
      },
      {
        path: 'library',
        element: (
          <div className="p-6">
            <h1 className="text-2xl font-semibold">Library</h1>
          </div>
        ),
      },
      {
        path: 'action-cards',
        element: (
          <div className="p-6">
            <h1 className="text-2xl font-semibold">Action Cards</h1>
          </div>
        ),
      },
      {
        path: 'reports',
        element: (
          <div className="p-6">
            <h1 className="text-2xl font-semibold">Reports</h1>
          </div>
        ),
      },
      {
        path: 'settings',
        element: (
          <div className="p-6">
            <h1 className="text-2xl font-semibold">Settings</h1>
          </div>
        ),
      },
      {
        path: 'help',
        element: (
          <div className="p-6">
            <h1 className="text-2xl font-semibold">Help</h1>
          </div>
        ),
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ToastProvider>
      <RouterProvider router={router} />
    </ToastProvider>
  </React.StrictMode>
);
