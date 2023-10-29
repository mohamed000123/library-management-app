### running
In the project directory, you can run:
### `npm i`
### `npm start`

simple library management app with these features:

1- authentication and authorization 

2- adding books to the library (it will be pending until it's approved by one of the admins)

- you can create admin account by calling this (post) end point  with postman (http://localhost:8000/create-admin)
- providing email and password in the request body
- EX
{ 
"email":"admin@gmail.com",
"password":"12345678"
}

3- edit book details

4- delete books 

5- see other users books and reserve a book if you want

