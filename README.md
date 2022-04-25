# movie-database-backend

Database<br/>
    User<br/>
        userId<br/>
        name<br/>
        username<br/>
        email<br/>
        password<br/>
        commentHistory<br/>
        movieHistory<br/>
    Movie<br/>
        movieId<br/>
        locationId<br/>
        title<br/>
        description<br/>
        genre<br/>
        rating<br/>
        director<br/>
        stars<br/>
        runtime<br/>
        yearReleased<br/>
        commentHistory<br/>
        owner<br/>
    Comment<br/>
        comment<br/>
        owner<br/>

Front-End Client<br/>
    1. Navigation Bar<br/>
        a. display a list of links to the various pages<br/>
        b. if user is logged in, display logged in user, else display login page<br/>
        c. have a loggout button that will reset the current user info<br/>
    2. Movie page<br/>
        a. Display a list of all movies user has created<br/>
        b. link to each movie to view all addiitonal info of selected movie<br/>
    3. Movie Info page<br/>
        a. display movie locationId<br/>
        b. display movie title<br/>
        c. display movie description<br/>
        d. display movie genre<br/>
        e. display movie rating<br/>
        f. display movie director<br/>
        g. display movie stars<br/>
        h. display movie runtime<br/>
        i. display movie yearReleased<br/>
        j. option to make a comment<br/>
        k. display movie comments<br/>
        l. option to edit and delete a movie<br/>
    4. User page<br/>
        a. display all user info<br/>
        b. option to edit and delete user<br/>
    5. Registration page<br/>
        a. create a user<br/>
        b. no duplicates users allowed<br/>
    6. Login page<br/>
        a. login in with a registered user<br/>
    7. Comment page<br/>
        a. input field to make a comment on a selected movie<br/>
    8. Search page<br/>
        a. ability to search for a movie based on certain criteria<br/>

Back-End Server<br/>
    GET /users/profile<br/>
        a. makes a request to the api to get all user info<br/>
        b. displays all user info<br/>
        c. option to edit and delete user<br/>
    GET /users/movies<br/>
        a. makes a request to the api to get users movieHistory<br/>