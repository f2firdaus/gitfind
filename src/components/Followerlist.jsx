import React from 'react'

const Followerlist = ({data}) => {
  return (
      <div className='card followers-list'>
          <h2>Followers</h2>
          <table>
              <thead>
                  <tr>
                      <th>#</th>
                      <th colSpan={2}>Name</th>
                  </tr>
              </thead>
              <tbody>
                  {data.map((elem, idx) => {
                      console.log(elem)
                      return (
                          <tr>
                              <td>{idx + 1} </td>
                              <td> <img src={elem.avatar_url} alt="repo" /> </td>
                              <td>
                                  <a href={elem.html_url} rel="noreferrer"  target="_blank"> {elem.login }</a>
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

export default Followerlist