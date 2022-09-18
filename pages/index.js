import Head from 'next/head'
import Link from 'next/link';
import { useContext } from 'react';
import { ListContext } from '../providers/userlist';
import axios from 'axios';
import Users from './users';

export default function Home() {
  const { userlist, setList, clearList, handleAddUser, handleRemoveUserFromList, handleNameFilter } = useContext(ListContext);

  async function userlistApi() {
    const response = await axios.get('https://gorest.co.in/public/v2/users')

    response.data.forEach(function (value) {

      if (!userlist.some(item => value.name === item.name)) {
        userlist.push({
          name: value.name,
          email: value.email,
          status: value.status
        })
        handleAddUser(value.name, value.email, value.status);
      }
    })

    return;
  }

  async function userlistNameSearch(username) {

    const response = await axios.get('https://gorest.co.in/public/v2/users');

    response.data.forEach(function (value) {
      
      if (userlist.some(item => value.name === username)) {
        userlist.push({
          name: value.name,
          email: value.email,
          status: value.status
        })
        handleAddUser(value.name, value.email, value.status);
        
      } else {
        handleRemoveUserFromList(value);
      }
    })

    return;
  }

  return (
    <div className="container">
      <Head>
        <title>Eleven Dragons Teste</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <h1>Menu</h1>
        <div>
          <div>
            <label htmlFor="username">Nome:</label>
            <input
              className="inpt"
              type="text"
              id="username"
              name="username"
              pattern="[a-z0-9_]{1,20}"
              placeholder="Somente letras, números e/ou underscore."
              required></input>

            <label htmlFor="email">E-mail:</label>
            <input
              className="inpt"
              type="text"
              id="email"
              name="email"
              placeholder="exemplo@e-mail.com"
              pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$"
              required
            ></input>

            <label className="inpt" htmlFor="statusp">Status:</label>
            <select
              id="statusp"
              name="statusp"
              required>
              <option value="active">ativo</option>
              <option value="inactive">inativo</option>
            </select>

            <button className="btn" onClick={() => handleAddUser(username.value, email.value, statusp.value)}>CADASTRAR</button>
          </div>
          <br />
          <div>
            <div>
              <button className="btn" onClick={userlistApi}>CARREGAR LISTA</button>
              <button className="btn" onClick={clearList}>LIMPAR LISTA</button>
              <button className="btn" onClick={() => userlistNameSearch(username.value)}>PESQUISAR NOME</button>
              <button className="btn" onClick={() => handleRemoveUserFromList()}>FILTRAR POR ATIVOS</button>
            </div>
          </div>
        </div>
        <br />

        <h1>Usuários</h1>
        <div className="card">
          <table width="700">
            <thead>
              <tr>
                <th width="60%" scope="col">Nome</th>
                <th width="30%" scope="col">E-mail</th>
                <th width="10%" scope="col">Status</th>
              </tr>
            </thead>
            <tbody>
              {userlist.map(user => <tr><td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.status}</td>
              </tr>)}
            </tbody>

          </table>
        </div>

        <br />
        <ul>
          <li key="lista">
            <p>
              <Link href="/users">Lista de Usuários da API somente</Link>
            </p>
          </li>
          <li key="github">
            <p>
              <Link href="https://github.com/evitarafadiga">Github</Link>
            </p>
          </li>
        </ul>
      </main>

      <style jsx>{`
        .container {
          min-height: 100vh;
          padding: 0 0.5rem;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        main {
          padding: 5rem 0;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        footer {
          width: 100%;
          height: 100px;
          border-top: 1px solid #eaeaea;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        footer img {
          margin-left: 0.5rem;
        }

        footer a {
          display: flex;
          justify-content: center;
          align-items: center;
        }

        a {
          color: inherit;
          text-decoration: none;
        }

        .title a {
          color: #0070f3;
          text-decoration: none;
        }

        .title a:hover,
        .title a:focus,
        .title a:active {
          text-decoration: underline;
        }

        .title {
          margin: 0;
          line-height: 1.15;
          font-size: 4rem;
        }

        .title,
        .description {
          text-align: center;
        }

        .description {
          line-height: 1.5;
          font-size: 1.5rem;
        }

        code {
          background: #fafafa;
          border-radius: 5px;
          padding: 0.75rem;
          font-size: 1.1rem;
          font-family: Menlo, Monaco, Lucida Console, Liberation Mono,
            DejaVu Sans Mono, Bitstream Vera Sans Mono, Courier New, monospace;
        }

        .grid {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-wrap: wrap;

          max-width: 800px;
          margin-top: 3rem;
        }

        .card {
          margin: 1rem;
          flex-basis: 45%;
          padding: 1.5rem;
          text-align: left;
          color: inherit;
          text-decoration: none;
          border: 1px solid #eaeaea;
          border-radius: 10px;
          transition: color 0.15s ease, border-color 0.15s ease;
        }

        .card:hover,
        .card:focus,
        .card:active {
          color: #0070f3;
          border-color: #0070f3;
        }

        .card h3 {
          margin: 0 0 1rem 0;
          font-size: 1.5rem;
        }

        .card p {
          margin: 0;
          font-size: 1.25rem;
          line-height: 1.5;
        }

        .inpt {
          margin: 10px;
          padding: 0 7px 0 7px;
        }

        .btn {
          margin: 15px;
          padding: 0 7px 0 7px;
        }

        .logo {
          height: 1em;
        }

        @media (max-width: 600px) {
          .grid {
            width: 100%;
            flex-direction: column;
          }
        }
      `}</style>

      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
            Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
            sans-serif;
        }

        * {
          box-sizing: border-box;
        }
      `}</style>
    </div>
  )
}