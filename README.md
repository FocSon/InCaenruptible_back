## Type 

- Object Alert:
    - id : number;
    - title : string;
    - description : string;
    - startTime :  timeStamp;
    - endTime : timeStamp | null;
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

**GET** --> `/api/alertDone`   
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

`alertRefused`   Server ---> Client
>    **Content**  
        - requestId : number ; id of the request.  

`alertAccepted`   Server ---> Client
>    **Content**  
        - requestId : number ; id of the request.  
        - token : string ; token to auth the emitter.  
        - alertId : number ; id of the alert created.

`alertDone`   Server ---> Client
>    **Content**  
        - alertId : number ; id of the alert done.  
        - message : string ; message to display to the user.
