import React, { useState} from "react";
import { format } from "date-fns";
import "./styles.css";
import Axios from "axios";


export default function Teste() {
  const [eventos, setEventos] = useState([]);
  const [sort, setSort] = useState("updated");
  const [direction, setDirection] = useState("asc");

  async function pesquisa(query) {
    await Axios.get(
      `https://api.github.com/search/repositories?q=${query}user:HSMA-F`
    )
      .then((response) => {
        setEventos(response.data.items);
      })
      .catch((error) => {
        console.log("Error fetching and parsing data", error);
      });
  }

   async function reload() {
    await Axios.get("https://api.github.com/users/HSMA-F/repos", {
      params: {
        sort: sort,
        direction: direction,
      },
    }).then((res) => {
      setEventos(res.data);
    });
  }
  
  async function ord() {
    await Axios.get("https://api.github.com/users/HSMA-F/repos", {}).then((res) => {
      setEventos(res.data);
    });
  }

  return (
    <>
      <main>
        <div className="conteudo">
          <div className="box">
            <h1>Repositórios HSMA-F</h1>
            <input
              type="text"
              placeholder="Pesquisar"
              onChange={(e) => pesquisa(e.target.value)}
            />
            <button onClick={ord}>Ordem Alfabética</button>
            <select name="SORT" onChange={(e)=>{setSort(e.target.value); reload()}}>
              <option value="created">Created</option>
              <option value="updated">Updated</option>
            </select>
            <select name="numero" onChange={(e)=>{setDirection(e.target.value); reload()}}>
              <option value="asc">Ascendente</option>
              <option value="desc">Descendente</option>
            </select>
            <table className="table table-striped">
              <thead>
                <tr>
                  <th scope="col">Nome</th>
                  <th scope="col">Criado em</th>
                  <th scope="col">Ultimo push</th>
                  <th scope="col">Link</th>
                </tr>
              </thead>
              <tbody>
                {eventos.map((eventos) => (
                  <tr>
                    <td>{eventos.name}</td>
                    <td>
                      {format(new Date(eventos.created_at), "dd/MM/yyyy")}
                    </td>
                    <td>{format(new Date(eventos.pushed_at), "dd/MM/yyyy")}</td>
                    <td>
                      <a href={eventos.html_url} alt="Link" target="_BLANK">
                        <button>Acessar</button>
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </>
  );
}
