class ApiResponse{
    constructor(statusCode, data, message = "Success"){
        this.statusCode = statusCode;
        this.data = data;
        this.message = message
        this.success = statusCode>=200 && statusCode < 400;
        if(statusCode>=100 && statusCode<200){
            this.message += " Informational responses (100 – 199)";
        }
        else if(statusCode>=200 && statusCode<300){
            this.message += " Successful responses (200 – 299)";
        
        }
        else if(statusCode>=300 && statusCode<400){
            this.message += " Redirection responses (300 – 399)";
        }
        else if(statusCode>=400 && statusCode<500){
            this.message += " Client error responses (400 – 499)";
        }
        else if(statusCode>=500 && statusCode< 600){
        
            this.message += " Server error responses (500 – 599)";
        }

        this.message += " as per the apiResponseUtility : ";
        switch (statusCode) {
            case 100:
                this.message +=  " Continue \nthe client should continue the request or ignore the response if the request is already finished.";
                break;
           
            case 101:
                this.message +=  " Switching Protocols \nUpgrade request header from the client and indicates the protocol the server is switching to.";
                break;
            
            case 102:
                this.message +=  " Processing (WebDAV) \nThe server has received and is processing the request, but no response is available yet";
                break;

            case 103:
                this.message +=  " Early Hints \nThis status code is primarily intended to be used with the Link header, letting the user agent start preloading resources while the server prepares a response or preconnect to an origin from which the page will need resources.";
                
                break; 
            case 200:
                this.message += ` OK \nThe request succeeded. The result meaning of "success" depends on the HTTP method:
                GET: The resource has been fetched and transmitted in the message body.

                HEAD: The representation headers are included in the response without any message body.
                PUT or POST: The resource describing the result of the action is transmitted in the message body.
                
                TRACE: The message body contains the request message as received by the server.`;
                break;
            case 201:
                this.message +=  " Created \nThe request succeeded, and a new resource was created as a result. this is typically the response sent after POST requests, or some PUT requests.";
                break;
            case 202:
                this.message +=  " Accepted \nThe request has been received but not yet acted upon. It is noncommittal, since there is no way in HTTP to later send an asynchronous response indicating the outcome of the request. It is intended for cases where another process or server handles the request, or for batch processing.";
                break;
            case 203:
                this.message +=  " Non-Authoritative Information \nThis response code means the returned metadata is not exactly the same as is available from the origin server, but is collected from a local or a third-party copy. this is mostly used for mirrors or backups of another resource. Except for that specific case, the 200 OK response is preferred to this status.";
                break;
            case 204:
                this.message +=  " No Content \nThere is no content to send for this request, but the headers may be useful. The user agent may update its cached headers for this resource with the new ones.";
                break;
            case 205:
                this.message +=  " Reset Content \nTells the user agent to reset the document which sent this request.";
                break;
            case 206:
                this.message +=  " Partial Content \nthis response code is used when the Range header is sent from the client to request only part of a resource.";
                break;
            case 207:
                this.message +=  " Multi-Status (WebDAV) \nConveys information about multiple resources, for situations where multiple status codes might be appropriate.";
                break;
            case 208:
                this.message +=  " Already Reported (WebDAV) \nUsed inside a <dav:propstat> response element to avoid repeatedly enumerating the internal members of multiple bindings to the same collection.";
                break;
            case 226:
                this.message +=  " IM Used (HTTP Delta encoding) \nThe server has fulfilled a GET request for the resource, and the response is a representation of the result of one or more instance-manipulations applied to the current instance.";
                break;
            case 300:
                this.message +=  " Multiple Choices \nThe request has more than one possible response. The user agent or user should choose one of them. (There is no standardized way of choosing one of the responses, but HTML links to the possibilities are recommended so the user can pick.)";
                break;
            case 301:
                this.message +=  " Moved Permanently \nThe URL of the requested resource has been changed permanently. The new URL is given in the response.";
                break;
            case 302:
                this.message +=  " Found \nthis response code means that the URI of requested resource has been changed temporarily. Further changes in the URI might be made in the future. Therefore, this same URI should be used by the client in future requests";
                break;
            case 103:
                this.message +=  " enter data and message \n";
                break;
            
            default:
                break;
        }
    }
}




module.exports = ApiResponse;