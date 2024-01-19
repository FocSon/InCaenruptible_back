## Installation

- Création d'un fichier `.env.local` à la racine du projet
```
NODE_ENV=development
PORT=<port>
JWT_SECRET=<secret>
```

- Installation des dépendances
``` shell
pnpm install
```

- Lancer le serveur
``` shell
pnpm server:dev
```

### Warning

Pour utiliser toutes les fonctionnalités de ce serveur, il est nécéssaire de disposer d'un serveur sécurisé par SSL et accéder au site web en utilisant le protocole HTTPS.
Les flux vidéos étant bloqués par le navigateur dans le cas contraire, la partie streaming ne sera pas effective sinon.

## Type 

- Object Alert:
    - id : number;
    - title : string;
    - description : string;
    - startTime :  timeStamp;
    - endTime : timeStamp | null;
    - type : video / photo / data(pollution,noise,...);
    - category : pollution / noise / deterioration;

- Object Request:
    - requestId : number;
    - title : string;
    - description : string;
    - startTime :  timeStamp;
    - type : video / photo / data(pollution,noise,...);
    - category : pollution / noise / deterioration;


- Object Post:
    - id : number;
    - title : string;
    - description : string;
    - publishingTime : timeStamp;
    - content : string(html in it ?) ;  
    - alertIds : number[] ; 

## Endpoint 

### Client 

#### API REST

**GET** --> `/api/alertsDone`   
>    **Inputs**   
        - n : number (10);  number of alerts asked by the client.  
        - startId number | undefined; id of the last alert received and undefined if none.   

>    **Output**  
        -  alerts : Alert[] ;

**GET** --> `/api/posts`   
>    **Inputs**   
        - n : number (10);  number of posts asked by the client.  
        - startId number | undefined; id of the last post received and undefined if none.   

>    **Output**  
        -  posts : Omit<Post,content>[] ; # List of posts without any content

**GET** --> `/api/post/:id`   
>    **Inputs**   
   
>    **Output**  
        -  post : Post ;

#### WebSocket

`askInit`   Client ---> Server  

`init`   Server ---> Client  
>    **Content**  
        - alerts : Alert[] ; list of alerts currently active.   
        - mainAlertId : number | null ; id of the main alert.   
 
`newAlert`   Server ---> Client  
>    **Content**  
        - alert : Alert ; new currently active alert.    

`deleteAlert`   Server ---> Client  
>    **Content**  
        - id : number ; alert that needs to be deleted. 

`alertDone`   Server ---> Client  
>    **Content**  
        - id : number ; alert that just finished.

`setMainAlert`   Server ---> Client  
>    **Content**  
        - id : number ; alert that will become the main one. 

`streamAlertData`   Server ---> Client  
>    **Content**  
        - id : number; alert identifier.  
        - data : any ; data from the streamed alert. 

    
`watchAlert`   Client ---> Server 
>    **Content**  
        - id : number ; alert being requested to be watched 

`stopWatchAlert`   Client ---> Server  
>    **Content**  
        - id : number ; alert not to watch anymore.

### Emitter

#### API REST

**POST** --> `/api/requestAlert`  
>    **Inputs**   
        - type : string ; type of the alert requested.  
        - category : string ; category of the alert requested.  
        - title : string ; title of the alert requested.  
        - description : string ; description of the alert requested.  
        - token : string | undefined ; token of the device if it has one.

>   **Output**  
        - requestId : number ; id of the request.  
        - token : string ; token to auth the emitter.

#### WebSocket

`streamData`   Client ---> Server
>    **Content**  
        - data : any ; data from the streamed alert.  
        - token : string ; token to auth the emitter.

`stopStream`   Client ---> Server
>    **Content**  
        - token : string ; token to auth the emitter.

`emitter:alertRefused`   Server ---> Client
>    **Content**  
        - requestId : number ; id of the request.  

`emitter:alertAccepted`   Server ---> Client
>    **Content**  
        - requestId : number ; id of the request.  
        - token : string ; token to auth the emitter.  
        - alertId : number ; id of the alert created.

`emitter:alertDone`   Server ---> Client
>    **Content**  
        - alertId : number ; id of the alert done.  
        - message : string ; message to display to the user.

### Admin

#### API REST

**POST** --> `/api/login`
>    **Inputs**   
        - username : string ; username of the admin.  
        - password : string ; password of the admin.

>   **Output**
        - token : string ; token to auth the admin.

**POST** --> `/api/setMainAlert` (auth)
>    **Inputs**   
        - id : number ; id of the alert to set as main.  

**POST** --> `/api/refuseRequest` (auth)
>    **Inputs**   
        - id : number ; id of the request to refuse.

**POST** --> `/api/acceptRequest` (auth)
>    **Inputs**   
        - id : number ; id of the request to accept.  
        - title : string | undefined ; title of the request.  
        - description : string | undefined ; description of the request.  
        - category : string | undefined ; category of the request.  

**POST** --> `/api/deleteAlert` (auth)
>    **Inputs**   
        - id : number ; id of the alert to delete.

**POST** --> `/api/endAlert` (auth)
>    **Inputs**   
        - id : number ; id of the alert to end.  
        - message : string | undefined ; message to display to the user.  

**POST** --> `/api/updateAlert` (auth)
>    **Inputs**   
        - id : number ; id of the alert to update.  
        - title : string | undefined ; title of the alert.  
        - description : string | undefined ; description of the alert.  
        - category : string | undefined ; category of the alert.  

**POST** --> `/api/createPost` (auth)
>    **Inputs**   
        - title : string ; title of the post.  
        - description : string ; description of the post.  
        - content : string ; content of the post.  
        - alertIds : number[] ; ids of the alerts linked to the post.  
        - medias : I don't know yet ; medias to upload that are used in the post.  

**POST** --> `/api/deletePost` (auth)
>    **Inputs**   
        - id : number ; id of the post to delete.

#### WebSocket

`admin:startAdminSession`   Client ---> Server
>    **Content**  
        - token : string ; token to auth the admin.

`admin:init`   Server ---> Client
>    **Content**  
        - requests : Request[] ; list of requests not yet accepted or refused.

`admin:endAdminSession`   Client ---> Server
>    **Content**  
        - token : string ; token to auth the admin.

`admin:newRequest`   Server ---> Client
>    **Content**  
        - request : Request ; new request not yet accepted or refused.

`admin:requestDeleted`   Server ---> Client
>    **Content**
        - requestId : number ; id of the request deleted.

`admin:watchRequest`   Client ---> Server
>    **Content**  
        - token : string ; token to auth the admin.  
        - requestId : number ; id of the request to watch.

`admin:stopWatchRequest`   Client ---> Server
>    **Content**  
        - token : string ; token to auth the admin.  
        - requestId : number ; id of the request to stop watching.

`admin:streamRequestData`   Server ---> Client
>    **Content**  
        - requestId : number ; id of the request to stream data from.  
        - data : any ; data from the streamed request.
