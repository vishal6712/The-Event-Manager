import React, { useEffect, useState } from 'react'
import Adminusercard from './Adminusercard'
import base_url from '../api/bootapi'
import swal from 'sweetalert2'
import axios from 'axios'

function Adminusers() {
  useEffect(() => {
    document.title = 'Users List'
    if (sessionStorage.getItem('admin') != 'admin') {
      window.location = '/'
    }
    viewUsers()
  }, [])

  const viewUsers = () => {
    axios.get(`${base_url}/getallusers`).then(
      (response) => {
        if (response.data.length == 0) {
          swal.fire({
            title: 'Admin',
            text: 'There are no users registered',
            icon: 'error',
            button: 'Ok',
          })
        }
        setUsers(response.data)
      },
      (error) => {
        console.log(error)
        swal.fire('Server is down')
      },
    )
  }

  const [users, setUsers] = useState([])

  return (
    <div>
      <div class="container mt-5 pt-5">
        <h1 className=" mb-3 text-center fw-bold myfontAdm1">View All Users</h1>
        <div>
          <div>
            <table
              class="text-center table table-hover table-striped table-bordered table-info m-auto mt-5"
              style={{ width: '90%' }}
            >
              <thead>
                <tr className="fs-4 form-label">
                  <th class="fs-4 text-center fw-bold myfontAdm" scope="col">
                    Name
                  </th>
                  <th class="fs-4 text-center fw-bold myfontAdm" scope="col">
                    City
                  </th>
                  <th class="fs-4 text-center fw-bold myfontAdm" scope="col">
                    Phone
                  </th>
                  <th class="fs-4 text-center fw-bold myfontAdm" scope="col">
                    E-mail
                  </th>
                  <th class="fs-4 text-center fw-bold myfontAdm" scope="col">
                    Password
                  </th>
                  <th class="fs-4 text-center fw-bold myfontAdm" scope="col">
                    Security Question
                  </th>
                  <th class="fs-4 text-center fw-bold myfontAdm" scope="col">
                    Answer
                  </th>
                  <th class="fs-4 text-center fw-bold myfontAdm" scope="col">
                    Admin
                  </th>
                  <th class="fs-4 text-center fw-bold myfontAdm" scope="col">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {users.length > 0 ? (
                  users.map((item) => <Adminusercard user={item} />)
                ) : (
                  <h2 className="text-center m-5 p-5">No users registered</h2>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Adminusers
