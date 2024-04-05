import React from 'react'
import "../../sass/createJob.scss";

export default function CreateJob() {
  return (
   <>

  <div className='select__stacks center'>
    <h1 className='preffered__stacks'>Prefferred Stacks</h1>
    <p className='require'>What skills do you require</p>

    <div>
      <input type="text" id='langauge' />
      <form action="#">
      <label for="lang">Language</label>
      <select name="languages" id="lang">
        <option value="javascript">JavaScript</option>
        <option value="php">PHP</option>
        <option value="java">Java</option>
        <option value="golang">Golang</option>
        <option value="python">Python</option>
        <option value="c#">C#</option>
        <option value="C++">C++</option>
        <option value="erlang">Erlang</option>
      </select>
      <input type="submit" value="Submit" />
</form>
    </div>
    <div>
      <span>designer</span>
      <button></button>
    </div>
    <button>continue</button>
   </div>
   <div className='description'></div>
   <div className='duration'></div>
   </>
  )
}
