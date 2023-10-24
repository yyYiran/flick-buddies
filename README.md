# FlickBuddies

Welcome to FlickBuddies, a web application for you to rate and discover movies while connecting with movie enthusiasts with similar tastes. This project uses Spring Boot 3.1.4 for [backend](https://github.com/yyYiran/flick-buddies-backend) and Angular 14.2.5 for the frontend to create a seamless and interactive movie reviewing and recommendation experience. 

## Features
- [x] **Search**: Search for movies by name
- [x] **Movie Rating & Review:** Users can rate movies they've watched, providing personal insights into their preferences
- [ ] **Movie Recommendations**: Based on user's interaction with movies, recommend similar movies
- [ ] **User Connection**: Based on user's interaction with movies, connect user with other users who share similar movie tastes

## Getting started

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Technologies Used
- Spring Boot: The backend is powered by Spring Boot, offering a robust and scalable server-side framework.
- Angular TypeScript: The frontend is built with Angular TypeScript, providing a dynamic and responsive user interface.
- RESTful API: Communication between the frontend and backend is achieved through RESTful APIs. Source of movie data is [TMDB API](https://developer.themoviedb.org/docs/getting-started)
- Database: Movie and user data are stored and managed in MySQL
- Authentication and Security: User authentication and data security are handled through Spring Security with JWT authentication
## License
This project is licensed under the MIT License. See the [LICENSE](https://github.com/yyYiran/flick-buddies/blob/readme/LICENSE) file for details.

