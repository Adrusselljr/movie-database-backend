# movie-database-backend

Database
    User
        userId
        name
        username
        email
        password
        commentHistory
        movieHistory
    Movie
        movieId
        locationId
        title
        description
        genre
        rating
        director
        stars
        runtime
        yearReleased
        commentHistory
        owner
    Comment
        comment
        owner

Front-End Client
    1. Navigation Bar
        a. display a list of links to the various pages
        b. if user is logged in, display logged in user, else display login page
        c. have a loggout button that will reset the current user info
    2. Movie page
        a. Display a list of all movies user has created
        b. link to each movie to view all addiitonal info of selected movie
    3. Movie Info page
        a. display movie locationId
        b. display movie title
        c. display movie description
        d. display movie genre
        e. display movie rating
        f. display movie director
        g. display movie stars
        h. display movie runtime
        i. display movie yearReleased
        j. option to make a comment
        k. display movie comments
        l. option to edit and delete a movie
    4. User page
        a. display all user info
        b. option to edit and delete user
    5. Registration page
        a. create a user
        b. no duplicates users allowed
    6. Login page
        a. login in with a registered user
    7. Comment page
        a. input field to make a comment on a selected movie
    8. Search page
        a. ability to search for a movie based on certain criteria

Back-End Server
    GET /users/profile
        a. makes a request to the api to get all user info
        b. displays all user info
        c. option to edit and delete user
    GET /users/movies
        a. makes a request to the api to get users movieHistory