 import { useEffect, useState } from 'react';
 import './index.css';
 import { Button, InputGroup,Toaster,EditableText } from '@blueprintjs/core';
 import './App.css';

 
 const AppToster= Toaster.create(
{

    position:"bottom"
}

 );



function App() {
    const [users,setUser]=useState([]);
    const [newName,setNewName]=useState([""]);
    const [newEmail,setNewEmail]=useState([""]);
    const [newWebsite,setNewWebsite]=useState([""]);


    function adduser(){

      const name=newName.trim();
      const email=newEmail.trim();
      const website=newWebsite.trim();
      if(name&&email&&website){

fetch ("https://jsonplaceholder.typicode.com/users",  
    {
  method:"POST",
  body:JSON.stringify({
name,email,website

  }),
headers:{
  "Content-Type":"application/json; charset=UTF-8"
}
}
).then((Response)=>Response.json())
.then(data=>{

    setUser([...users,data]);
    AppToster.show ({
      message:"user has been inserted",  
      intent :'success',
      timeout:3000
    })
    setNewName("");
    setNewEmail("");
    setNewWebsite("");
})

      }
    }
    function onChangeHandler(id,key,value){
        setUser ((users) =>{
 return users.map(user => {
   return user.id===id ? {...user,[key] : value} : user;
}
)
        }
      )

    }

    function updateuser(id){
      const user=users.find((user)=>user.id===id);
      fetch (`https://jsonplaceholder.typicode.com/users/${id}`,  
        {
      method:"PUT",
      body:JSON.stringify(user),
    headers:{
      "Content-Type":"application/json; charset=UTF-8"
    }
    }
    ).then((Response)=>Response.json())
    .then(data=>{
    
        
        AppToster.show ({
          message:"user has been updated",  
          intent :'success',
          timeout:3000
        })
         
    })
    
          }

    function deleteUser(id){
      fetch (`https://jsonplaceholder.typicode.com/users/${id}`,  
        {
      method:"DELETE",
      
     
    }
    ).then((response)=>response.json())
    .then(data=>{
      setUser ((users)=> {
     return users.filter( user=>user.id !== id)

       })
        
        AppToster.show ({
          message:"user datails  has been Deleted",  
          intent :'success',
          timeout:3000
        })
         
    })


    }

    useEffect(()=>{
  fetch('https://jsonplaceholder.typicode.com/users')
.then((Response)=>Response.json())
.then((json)=>setUser(json))
    },[])
  return (
    <div className="App">
        <table  className='bp4-html-table modifier'>
<thead className='App-header' >
<th>ID </th>
<th>Name</th>
<th>Email</th>
<th>WebSite</th>
<th>Action</th>
</thead>
<tbody className='App-h'>

    {users.map(user=>
    <tr key={user.id} >
<td>{user.id}</td>
<td> <EditableText  onChange={value => onChangeHandler(user.id,'name',value)} value={user.name}/></td>
<td> <EditableText onChange={value => onChangeHandler(user.id,'email',value)} value={user.email}/></td>
<td> <EditableText onChange={value => onChangeHandler(user.id,'website',value)}  value={user.website}/> </td>
<td>
  <Button  onClick={()=>updateuser(user.id)} intent='primary' >Update</Button>
  <Button onClick={()=>deleteUser(user.id)}  intent='danger' >Delete</Button>
</td>
</tr>
)}

  </tbody>
  <tfoot>
    <tr>
      <td></td>
      <td>
        <InputGroup value={newName}
        onChange={(e)=>setNewName(e.target.value)}
        placeholder='Enter the Name'
        />
      </td>
      <td>
        <InputGroup value={newEmail}
        onChange={(e)=>setNewEmail(e.target.value)}
        placeholder='Enter the Email'
        />
      </td>
      <td>
        <InputGroup value={newWebsite}
        onChange={(e)=>setNewWebsite(e.target.value)}
        placeholder='Enter the web site'
        />
      </td>
      <td><Button intent='success' onClick={adduser}>Add Details</Button></td>
    </tr>
  </tfoot>
  </table>
    </div>
  );
}

export default App;
