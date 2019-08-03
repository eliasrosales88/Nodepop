# Nodepop
**Nodejs API project**

This documentation is intended to explain how the API works, to install the required dependencies, to set up the database of the project and run the webapp on localhost.

This API uses iodocs for live documentation and is required to have a redis server running in your machine.

## Installing dependencies 
To install the required dependencies you need to run two commands:  

1. `npm install`
2. ` npm run iodocsinstall`

## Setting up the DDBB 
To set the database you need to have installed MongoDB.

In mongo folder you need to open de terminal and run:
`./bin/mongod --dbpath ./data/db --directoryperdb`

Optionally: You can open a new terminal and execute `./bin/mongo` to run the mongo client

**To run the project** In the root folder of the project you need to run:  

For linux and Mac use:  
`npm run dev`  

For windows use:  
`npm run devwin`  

## Sorting data  
* After server is running, to sort data you have the next filters:  
* Any text -> `title=Any text`   
* Exact price -> `price= 5000` or  
* Range -> `price= 100-5000` or  
* Less than or equal -> `price=-3500` or  
* Greater than or equal -> `price=100-`  
* `isSold=true` | `isSold=false`  
* Any existing name in the database with the extension -> `picture=photo.jpg`  
* Multiple tags -> `tags=`  
* Skip -> `skip=5`  
* `limit=3`  
* `sort=price`    
* `sort=isSold`    

---
# API documentation  
*To get the best of the API documentation you can go to the next url to have live documentation provided by iodocs* `http://localhost:3000/apiv1/doc` this will redirect to port **3001**  
To go back you can go to the root of 3001 and you will be redirected.

**GET** `apiv1/adverts`  
Returns a list of all adverts

---
**GET** `apiv1/adverts/:id`  
Returns one advert  
Example  
`/apiv1/adverts/5d434b17654a87360c120d19`

```json
    {
        "success": true,
        "result": {
            "tags": [
                "['lifestyle']"
            ],
            "_id": "5d434b17654a87360c120d19",
            "title": "Road trip",
            "description": "Road trip with random people",
            "price": 444,
            "isSold": true,
            "picture": "photo.jpg",
            "__v": 0
        }
}
```

---
**POST** `apiv1/`  
Creates an advert  
>The data comes from the **body** of the resquest and the properties of the Advert object are:
>
>* title: String
>* description: String
>* price: Number
>* isSold: Boolean
>* picture: String
>* tags: Array

Example  
```json
{
    "success": true,
    "result": {
        "tags": [
            "['lifestyle']"
        ],
        "_id": "5d4349d0654a87360c120d18",
        "title": "Road trip",
        "description": "Road trip with random people",
        "price": 444,
        "isSold": true,
        "picture": "photo.jpg",
        "__v": 0
    }
}
```
---
**PUT** `apiv1/:id`  
Edit an advert  
>The params are passed in the body of the request.
>
>
>
Example  
`/apiv1/adverts/5d434895654a87360c120cfe`  
```json
{
    "success": true,
    "result": {
        "tags": [
            "motor"
        ],
        "_id": "5d434895654a87360c120cfe",
        "title": "Title changed with put",
        "description": "White Ford fiesta",
        "price": 2000,
        "isSold": true,
        "picture": "ford-white.jpg",
        "__v": 0
    }
}
```

---
**DELETE** `apiv1/:id`  
Delete an advert  
Example  
`apiv1/adverts/5d434b17654a87360c120d19`

```json
{
    "success": true
}
```
---  
**GET** `apiv1/tags`  
Returns a list of all tags

```json
{
    "success": true,
    "results": [
        "motor",
        "mobile",
        "lifestyle",
        "work"
    ]
}
```

--- 




