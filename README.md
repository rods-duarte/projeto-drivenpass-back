# <p align = "center"> Projeto DrivenPass </p>

<p align="center">
   <img width="200px" src="https://user-images.githubusercontent.com/98065049/179421474-da914106-a11b-4d15-a427-ac0a69ae1567.png" />
</p>

##  :clipboard: Descrição

DESCRIPTION

***

## :computer:	 Tecnologias e Conceitos

- REST APIs
- JWTs & refresh tokens
- Node.js
- TypeScript
- MongoDB with Mongoose

***

## :rocket: Routes

- [Authentication](#authentication)
- [Credentials](#credentials)
- [Cards](#cards)
- [Notes](#notes)
- [Networks](#networks)



### Authentication 

#### Sign-up

```yml
POST /signup
    - Route to register a new user
    - headers: {}
    - body:{
        "email": "lorem@gmail.com",
        "senha": "loremipsum"
}
```

#### Sign-in
    
```yml 
POST /signin
    - Route to login
    - headers: {}
    - body: {
    "email": "lorem@gmail.com",
    "senha": "loremipsum"
    }
```

### Credentials

#### Create (authenticated)
    
```yml 
POST /credentials
    - Route to register a new credential
    - headers: { "Authorization": "Bearer $token" }
    - body: {
    "title": "lorem",
    "url": "website",
    "username": "user",
    "password": "1234"
    }
```

#### Read (authenticated)

```yml
GET /credentials/ (autenticada)
    - Route to list all user credentials
    - headers: { "Authorization": "Bearer $token" }
    - body: {}
``` 

```yml
GET /credentials/:id (autenticada)
    - Route to list credential by id
    - headers: { "Authorization": "Bearer $token" }
    - body: {}
```

#### Delete (authenticated)
 
```yml
DELETE /credentials/:id (autenticada)
    - Route to delete credential by id
    - headers: { "Authorization": "Bearer $token" }
    - body: {}
```
***

### Cards

#### Create (authenticated)
    
```yml 
POST /cards
    - Route to register a new card
    - headers: { "Authorization": "Bearer $token" }
    - body: {
    "title": "lorem",
    "number": "0000-0000-0000-0000",
    "cardHolderName": "Name M LastName",
    "expirationDate": "00/00",
    "securityCode": "111",
    "password": "1234",
    "virtual": false,
    "type": "Credit | Debit | Both"
    }
```

#### Read (authenticated)

```yml
GET /cards/ (autenticada)
    - Route to list all user cards
    - headers: { "Authorization": "Bearer $token" }
    - body: {}
``` 

```yml
GET /cards/:id (autenticada)
    - Route to list card by id
    - headers: { "Authorization": "Bearer $token" }
    - body: {}
```

#### Delete (authenticated)
 
```yml
DELETE /cards/:id (autenticada)
    - Route to delete card by id
    - headers: { "Authorization": "Bearer $token" }
    - body: {}
```
***

### Notes

#### Create (authenticated)
    
```yml 
POST /notes
    - Route to register a new note
    - headers: { "Authorization": "Bearer $token" }
    - body: {
    "title": "lorem",
    "content": "lorem"
    }
```

#### Read (authenticated)

```yml
GET /notes/ (autenticada)
    - Route to list all user notes
    - headers: { "Authorization": "Bearer $token" }
    - body: {}
``` 

```yml
GET /notes/:id (autenticada)
    - Route to list note by id
    - headers: { "Authorization": "Bearer $token" }
    - body: {}
```

#### Delete (authenticated)
 
```yml
DELETE /notes/:id (autenticada)
    - Route to delete note by id
    - headers: { "Authorization": "Bearer $token" }
    - body: {}
```
***

### Networks

#### Create (authenticated)
    
```yml 
POST /networks
    - Route to register a new WiFi network
    - headers: { "Authorization": "Bearer $token" }
    - body: {
    "title": "lorem",
    "name": "lorem",
    "password": "1234"
    }
```

#### Read (authenticated)

```yml
GET /networks/ (autenticada)
    - Route to list all user netowrks
    - headers: { "Authorization": "Bearer $token" }
    - body: {}
``` 

```yml
GET /networks/:id (autenticada)
    - Route to list network by id
    - headers: { "Authorization": "Bearer $token" }
    - body: {}
```

#### Delete (authenticated)
 
```yml
DELETE /networks/:id (autenticada)
    - Route to delete network by id
    - headers: { "Authorization": "Bearer $token" }
    - body: {}
```
***
