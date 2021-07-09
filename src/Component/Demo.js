import React,{useState,useEffect} from 'react'
import firebase from './Firebase'
function Demo() {
// we require authentication so we get it from firebase
 let auth = firebase.auth();
 // now we have to set our user and get the email and password from user also give error statment 

  const [user,setuser]=useState(null);
  const [email,setemai]=useState('');
  const [password,setpassword]=useState('');
  const [error,seterror]=useState('');
  const [loading,setloading]=useState(false);

  // we to create a handleSubmit function through which user can login 
  // we will make it async because we will fetch the data from firebase
const handleSubmit =async()=>{
    try{
        console.log(email+'  '+password);
        // when it fetch data from firebase we setloading is true
        setloading(true);
        // we store the results that fetched from firebase in result
        let result = await auth.signInWithEmailAndPassword(email,password);
        console.log(result.user);
        // we fetch the auth from firebase and now set the user as result
        setuser(result.user);
        // now after all finished we make loading as false
        setloading(false);

    }
    catch(e){
        // if error occurs we show this message
        seterror(e.message)
        // after 2 sec we dissapers the error message
        setTimeout(()=>{
            seterror('');
        },2000)
        // lastly we set loading as false
        setloading(false);

    }
}
// here we implement a function to sign out while we just signed in it is aasync function we are just fetching our data from firebase server
//in try 1st for fetching details for signout we set loading as true  and for signout we wrote signout function and set the user as null and stop loading
const handlelogout=async()=>{
    try{
        setloading(true);
       let res= await auth.signOut();
       console.log(res);
       setuser(null);
       setloading(false);
    }
    // if there is any intenet or server issue so we wrote cath function for displaying error
    catch(e){
      seterror(e.message);
      setTimeout(()=>{
          seterror('')
      },2000);
      setloading(false);
    }

}


// now we have to create  two input box for email and password and we have get the value from those box that user typed
// now for user to login we have to create a login button
// here also we have to give condition for which log in page will display to user if user did not signed in otherwise no log out page will shown
    return (
        <>{loading?<h1> please wait </h1>:user==null?

        <div>
            <label>
            Email:
            <input type="text" value={email} onChange={(e)=>setemai(e.target.value)}></input>
            </label>

            <label>
            Password:
           <input type="text" value={password} onChange={(e)=>setpassword(e.target.value)}></input>
            </label>

            <label>
                <button onClick={handleSubmit}>Log in</button>
                {error?<h1>{error}</h1>:<></>}
            </label>
        </div> : 
        <div>
        <h1> Welcome to your website {user.uid}</h1>
         <button onClick={handlelogout}>Log out</button>
        </div>

}
        </>
    )
}

export default Demo
