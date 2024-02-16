import {toast} from "react-toastify";

/**
 * Class for handling errors and displaying error messages to the user.
 * This class provides a centralized way to manage and display errors within the application.
 */
class ErrorHandler{
    
    /**
     * Displays an error message to the user based on the provided error object.
     * @param err - The error object to handle and display.
     */
    public showError(err: any){
        if(typeof(err) == 'string'){
            toast.error(err);
        }else if(err.response){
            toast.error(err.response.data);
        }else if(err.message){
            toast.error(err.message);
            
        } else {
            toast.error("Oops! Something went wrong...");
            console.log(err);
        }
    }
}

/**
 * singleton instance of the ErrorHandler class to instantiate ErrorHandler
 */
const errorHandler = new ErrorHandler();
export default errorHandler;