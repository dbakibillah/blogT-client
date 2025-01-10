# blogT

## Purpose

This project is a dynamic blog website designed for users to read, comment, and interact with tech blogs. It includes features like blog searching, filtering by categories, adding blogs to a wishlist, and user authentication. This project aims to provide a responsive, engaging experience for both users and administrators, featuring modern web technologies like React, Firebase, and MongoDB.

## Live URL: https://blogt-8ebbb.web.app/

## Key Features

- **User Authentication**: Email/password login and registration with an additional login method
- **Search & Filter**: Users can search blogs by title and filter them by categories.
- **Wishlist**: Logged-in users can add blogs to their wishlist.
- **Commenting System**: Users can comment on blogs, with conditional rendering to prevent users from commenting on their own blogs.

## NPM Packages Used

- `react`: JavaScript library for building user interfaces.
- `react-router-dom`: For routing and navigation.
- `firebase`: Authentication for secure login and registration.
- `react-loading-skeleton`: Displays loading skeletons instead of spinners for a smoother UX.
- `react-photo-view`: For viewing blog images in full-screen mode.
- `react-intersection-observer`: Adds animations to sections when they come into view.
- `axios`: For making HTTP requests.
- `react-icons`: Icons for the UI components.
- `sweetalert2`: For alerts and notifications (e.g., login errors or successful actions).
- `jsonwebtoken`: For implementing JWT-based authentication in private routes.
- `framer-motion`: For animations on the homepage and other components.
- `mui-datatables`: For creating sortable, interactive data tables.

## Features

- **Authentication**: Secure email/password login and registration with additional login methods.
- **Dynamic Blog Management**: Admins can add, update, and delete blogs.
- **Wishlist**: Users can manage blogs they’ve saved to their wishlist.
- **Featured Blogs**: Display the top 10 posts based on the length of the long description.
- **Commenting System**: Users can comment on blogs they haven't authored, with user profile integration.
- **Search and Filtering**: Search blogs by title and filter by category.
- **Responsive Layout**: The website adapts to all screen sizes, including mobile and tablet.
