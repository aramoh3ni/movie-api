# MOVIE-API

Movie-API build on Node.js with Express framework to service movies for customers. it build in Model-View-Controller (MVC) architectural/design pattern that 
separates an application into three main logical components Model, View, and Controller. 

# Models

  1- Movie
      Operation             Access
      --------------------------------------------------------
    * Create Movie          (Admin Only)
    * Update Movie          (Admin Only)
    * Read   Movie          (Everyone)
    * Delete Movie          (Admin Only)
    
  2- Rental
      Operation             Access
     --------------------------------------------------------
    * Create Rental         (Admin Only)
    * Read   Rental         (Admin Only)
    * Update Rental         (NOT_SUPPROT)
    * Delete Rental         (NOT_SUPPORT)
    
  3- Genre
      Operation             Access
     --------------------------------------------------------
    * Create  Genre         (Admin Only)
    * Read    Genre         (Authorized) + (Admin)
    * Upddate Genre         (Admin Only)
    * Delete  Genre         (Admin Only)
    
  4- Users
      Operation             Access
     --------------------------------------------------------
    * Create  User         (Everyone)
    * Read    User         (Authorized)
      1- Read Profile      (Authorized) + (Admin) // only can see his/her users.
      2- Read users        (Admin Only)
      3- Read user         (Admin Only)
    * Upddate User         (Authorized) + (Admin)
      1- Update Profile    (Authorized) + (Admin)
    * Delete  User         (NOT SUPPORT)
  
  5- Customer
      Operation             Access
     --------------------------------------------------------
    * Create  User         (Admin Only)
    * Read    User         (Admin Only)
    * Upddate User         (Admin Only)
    * Delete  User         (Admin Only)
    

## Usage

Clone or Download the Repository into your machine, then enter comment bellow in your terminal.

```
npm install --save
```

## A Notice About Installing (This project is in development) 

I am currently working on this movie-api, if any issue accured then you cant contact me.

## How to Contact

Email: alireza.mohseni.se@gmail.com


## License

MIT.

