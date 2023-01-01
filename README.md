# MOVIE-API

Movie-API build on Node.js with Express framework to service movies for customers. it build in Model-View-Controller (MVC) architectural/design pattern that 
separates an application into three main logical components Model, View, and Controller. 

## Models

  ###### **1- Movie** <br />
      Operation             Access<br />
      --------------------------------------------------------<br />
    * Create Movie          (Admin Only)<br />
    * Update Movie          (Admin Only)<br />
    * Read   Movie          (Everyone)<br />
    * Delete Movie          (Admin Only)<br />
    <br />
  ###### **2- Rental** <br />
      Operation             Access<br />
     --------------------------------------------------------<br />
    * Create Rental         (Admin Only)<br />
    * Read   Rental         (Admin Only)<br />
    * Update Rental         (NOT_SUPPROT)<br />
    * Delete Rental         (NOT_SUPPORT)<br />
    <br />
  ###### **3- Genre** <br />
      Operation             Access<br />
     --------------------------------------------------------<br />
    * Create  Genre         (Admin Only)<br />
    * Read    Genre         (Authorized) + (Admin)<br />
    * Upddate Genre         (Admin Only)<br />
    * Delete  Genre         (Admin Only)<br />
    <br />
  ###### **4- User** <br />
      Operation             Access<br />
     --------------------------------------------------------<br />
    * Create  User         (Everyone)<br />
    * Read    User         (Authorized)<br />
      1- Read Profile      (Authorized) + (Admin) // only can see his/her users.<br />
      2- Read users        (Admin Only)<br />
      3- Read user         (Admin Only)<br />
    * Upddate User         (Authorized) + (Admin)<br />
      1- Update Profile    (Authorized) + (Admin)<br />
    * Delete  User         (NOT SUPPORT)<br />
  <br />
  ###### **5- Customer** <br />
      Operation             Access<br />
     --------------------------------------------------------<br />
    * Create  User         (Admin Only)<br />
    * Read    User         (Admin Only)<br />
    * Upddate User         (Admin Only)<br />
    * Delete  User         (Admin Only)<br />
    <br />
<br />

## Usage

Clone or Download the Repository into your machine, then enter comment bellow in your terminal.

```
npm install --save
```

then run the server with bellow command in your terminal

```
npm run dev
```

## A Notice About Installing (This project is in development) 

I am currently working on this movie-api, if any issue accured then you cant contact me.

## How to Contact

Email: alireza.mohseni.se@gmail.com

## License

MIT.

