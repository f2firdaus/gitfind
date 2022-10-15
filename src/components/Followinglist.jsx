import React from 'react'

const Followinglist = ({ data }) => {
  return (
      <div className='card following-list'>
          <h2>Following List</h2>
          <table>
              <thead>
                  <tr>
                      <th>#</th>
                      <th colSpan={2}>Name</th>
                      
                  </tr>
              </thead>
              <tbody>
              {
                      data.map((ele, idx) => {
                      console.log(ele);
                      return (
                          <tr >
                              <td>{idx + 1} </td>

                              <td>
                                  <img src={ele.avatar_url} alt="profile" />
                                  </td>
                              <td>
                                  <a href={ele.html_url} rel="noreferrer"  target="_blank">{ele.login} </a>
                                  </td>
                          </tr>
                      )
                     
                  })
              } 
              </tbody>
          </table>
              
        
          </div>
  )
}

export default Followinglist