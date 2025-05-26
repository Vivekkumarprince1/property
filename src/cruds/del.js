
  function del()  {
  return(
    <div>
      <form action="/delete" method="post">

Id <input type="text" name="id" />


<input type="submit" value="submit" />
</form>
    </div>
  )
}

export default del;