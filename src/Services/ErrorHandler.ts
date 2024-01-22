class ErrorHandler{
    public showError(err: any){
        if(typeof(err) == 'string'){
            // toast.error(err);
            alert(err);
            console.log(err)
        }else if(err.response){
            // toast.error(err.response.data);
            alert(err);
            console.log(err)
        }else if(err.message){
            // toast.error(err.message);
            alert(err);
            console.log(err);
            
        } else {
            console.log(err);
            // toast.error("Oops! Something went wrong...");
            alert("Oops! Something went wrong...");
            console.log(err);
        }
    }
}

const errorHandler = new ErrorHandler();
export default errorHandler;