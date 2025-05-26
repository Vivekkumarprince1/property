

  function upd()  {
  return(
    <div>
      <form action="/update" method="post">

Id <input type="text" name="id" />
Name <input type="text" name="name" />
Salary <input type="text" name="salary" />
Age <input type="text" name="age" />


<input type="submit" value="submit" />
</form>
    </div>
  )
}

export default upd;