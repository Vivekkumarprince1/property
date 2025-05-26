

function list()  {
  return(
    <div>
      <table >
    <thead>
      <tr>
        <th>Email</th>
        <th>Name</th>
        <th>password</th>
        <th>Phone no.</th>
      
      </tr>
    </thead>
    <tbody>
      {logins.map((n) =>
      <tr >
         
        <td>= {n.email} </td>
        <td>{n.name}</td>
        <td>{n.password}</td>
        <td>{n.phone}</td>
   
      </tr>
    )}
    </tbody>
  </table>
    </div>
  )
}

export default list;