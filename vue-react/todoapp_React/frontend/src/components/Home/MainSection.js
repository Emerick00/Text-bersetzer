import React, { useEffect, useState } from "react";
import TacheCadre from "../Utilities/TacheCadre";
import axios from "axios";

const MainSection = () => {
  // FILE UNPLOAD
  const [image, setImage] = useState();
  const [uploading, setUploading] = useState(false);
  //

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("image", file);
    setUploading(true);

    try {
      const config = {
        Headers: {
          "Content-type": "multipart/form-data",
        },
      };

      const { data } = await axios.post("/api/upload", formData, config);
      setImage(data);
      console.log(data);

      setUploading(false);
    } catch (error) {
      console.log(error);
      setUploading(false);
    }
  };
  // CONDITION BOOLEAN STATE
  const [islogin, setIsLogin] = useState(true);
  const [isloading, setIsloading] = useState(false);
  const [loading, setLoading] = useState(true);
  const [createLoading, setCreateLoading] = useState(false);
  const [todos, setTodos] = useState([]);
  const [todoid, setTodoId] = useState();
  const [operation, setOperation] = useState([]);

  // CREER POST STATE
  const [description, setDescription] = useState();
  const [title, setTitle] = useState();
  const [date, setDate] = useState();

  // LOGIN STATE

  const [email, setEmail] = useState();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isEdict, setIsEdict] = useState(false);

  // USER INFOS STATE
  const [user, setUser] = useState({});

  useEffect(() => {
    const userinfo = JSON.parse(localStorage.getItem("user") || "{}");
    setPassword(userinfo.password);
    setEmail(userinfo.email);
    setUsername(userinfo.name);
    setUser(userinfo);
    setLoading(false);
  }, []);

  // CREER TODOS
  const newTodo = {
    description,
    title,
    date,
  };
  const config = {
    headers: {
      Authorization: `Bearer ${user.token}`,
    },
  };

  const todoHanlder = async (e) => {
    e.preventDefault();
    switch (isEdict) {
      case false:
        try {
          setCreateLoading(true);
          const { data } = await axios.post("/api/todos", newTodo, config);
          setTodos([data, ...todos]);
          setDescription("");
          setTitle("");
          setImage("");

          setCreateLoading(false);
        } catch (error) {
          setCreateLoading(false);
          console.log(error);
        }
        break;

      case true:
        try {
          setCreateLoading(true);
          await axios.put(`/api/todos/${todoid}`, newTodo, config);
          getTodoList();
          setDescription("");
          setTitle("");
          setImage("");
          setCreateLoading(false);
        } catch (error) {
          setCreateLoading(false);
          console.log(error);
        }
      default:
        break;
    }
  };

  // GET TODOLIST
  const getTodoList = async () => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    const config = {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    };

    try {
      const { data } = await axios.get("/api/todos", config);
      setTodos(data);
    } catch (error) {
      console.log(error);
    }
  };

  // GET TODOLIST
  const getOperation = async () => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    const config = {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    };

    try {
      const { data } = await axios.get("/api/operation", config);
      setOperation(data);
    } catch (error) {
      console.log(error);
    }
  };
  //
  useEffect(() => {
    getTodoList();
    getOperation();
  }, []);

  const submitHandler = async (e) => {
    e.preventDefault();

    switch (islogin) {
      case true:
        try {
          const user = {
            email,
            password,
          };
          setIsloading(true);
          const { data } = await axios.post("/api/users/login", user);
          localStorage.setItem("user", JSON.stringify(data));
          setIsloading(false);
          window.location.reload();
          setIsloading(false);
        } catch (error) {
          setIsloading(false);
          console.log(error);
        }
        break;

      case false:
        const newUser = {
          email,
          username,
          password,
        };

        if (confirmPassword !== password) {
          alert("Das Passwort stimmt nicht überein");
        } else {
          try {
            setIsloading(true);
            const { data } = await axios.post("/api/users/", newUser);

            localStorage.setItem("user", JSON.stringify(data));
            setIsloading(false);
            window.location.reload();
          } catch (error) {
            setIsloading(false);
            console.log(error);
          }
        }

        break;

      default:
        break;
    }
  };

  const deleteTodoHandler = async (id) => {
    if (window.confirm("Wollen Sie wirklich löschen")) {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      try {
        await axios.delete(`/api/todos/${id}`, config);
        getTodoList();
      } catch (error) {
        console.log(error);
      }
    }
  };

  function convertDateFormat(inputDate) {
    const date = new Date(inputDate);
    const day = date.getUTCDate().toString().padStart(2, "0");
    const month = (date.getUTCMonth() + 1).toString().padStart(2, "0");
    const year = date.getUTCFullYear().toString().slice(2);
    const hours = date.getUTCHours().toString().padStart(2, "0");
    const minutes = date.getUTCMinutes().toString().padStart(2, "0");

    return `${day}/${month}/${year} ${hours}:${minutes}`;
  }

  const EdictHandler = async (e) => {
    e.preventDefault();
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    const config = {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    };
    try {
      const user = {
        email,
        username,
        password,
      };

      setIsloading(true);
      const { data } = await axios.put("/api/users", user, config);
      localStorage.setItem("user", JSON.stringify(data));
      setIsloading(false);
      window.location.reload();
      setIsloading(false);
    } catch (error) {
      setIsloading(false);
      console.log(error);
    }
  };

  return (
    <div className="grid grid-cols-7 gap-5 my-5 ">
      <div className="grid grid-cols-3 col-span-5 gap-6 grid-els">
        {todos.map((todo) => (
          <TacheCadre
            setTodoId={setTodoId}
            setIsEdict={setIsEdict}
            isEdict={isEdict}
            setDescription={setDescription}
            setTitle={setTitle}
            setDate={setDate}
            todo={todo}
            userInfo={user}
            deleteTodoHandler={deleteTodoHandler}
          />
        ))}
      </div>
      <div className="flex flex-col col-span-2 space-y-6 ">
        <div className="p-2 rounded-md bg-slate-50 sdw-style">
          {isloading && (
            <div className="text-center ">
              <span>Chargement...</span>
            </div>
          )}
          <form
            // onSubmit={}
            className="flex flex-col p-4 space-y-2 "
          >
            {user && user.token && (
              <input
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                type="text"
                placeholder={`Benutzername`}
                className=" outline-none p-3 border-[2px] border-[#c7b2b2] bg-transparent rounded-md"
              />
            )}
            {!islogin && (
              <input
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                type="text"
                placeholder={`Benutzername`}
                className=" outline-none p-3 border-[2px] border-[#c7b2b2] bg-transparent rounded-md"
              />
            )}

            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder={`Email`}
              className=" outline-none p-3 border-[2px] border-[#c7b2b2] bg-transparent rounded-md"
            />
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder={`passwort`}
              className=" outline-none p-3 border-[2px] border-[#c7b2b2] bg-transparent rounded-md"
            />
            {!islogin && (
              <input
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                type="password"
                placeholder={`Bestätigen Sie das passwort`}
                className=" outline-none p-3 border-[2px] border-[#c7b2b2] bg-transparent rounded-md"
              />
            )}
            {user && user.token ? (
              ""
            ) : !islogin ? (
              <p>
                Sie haben bereits ein Konto?
                <span
                  onClick={() => setIsLogin(true)}
                  className="cursor-pointer text-[#334693] px-2"
                >
                  sich einloggen
                </span>
              </p>
            ) : (
              <p>
                Sie haben bereits ein Konto?
                <span
                  onClick={() => setIsLogin(false)}
                  className="cursor-pointer text-[#334693] px-2"
                >
                  sich registrieren
                </span>
              </p>
            )}
            {user && user.token ? (
              <button
                onClick={EdictHandler}
                className=" text-[1.2rem] py-2 font-medium rounded-md bg-[#334693] text-white"
              >
                Profil bearbeiten
              </button>
            ) : (
              <button
                onClick={submitHandler}
                className=" text-[1.2rem] py-2 font-medium rounded-md bg-[#334693] text-white"
              >
                {!islogin ? ` sich registrieren` : "Connexion"}
              </button>
            )}
          </form>
        </div>
        {user && user.token && (
          <div className="p-2 rounded-md bg-slate-50 sdw-style">
            <form
              onSubmit={todoHanlder}
              className="flex flex-col p-4 space-y-2 "
            >
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                type="text"
                placeholder={`Titel`}
                className=" outline-none p-3 border-[2px] border-[#c7b2b2] bg-transparent rounded-md"
              />
              <input
                value={date}
                onChange={(e) => setDate(e.target.value)}
                type="date"
                placeholder={`Bearbeitungsdatum`}
                className=" outline-none p-3 border-[2px] border-[#c7b2b2] bg-transparent rounded-md"
              />

              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={6}
                placeholder={`Beschreibung`}
                className=" outline-none p-3 border-[2px] border-[#c7b2b2] bg-transparent rounded-md"
              ></textarea>
              {/* <input
                type='file'
                accept='image/*'
                onChange={handleImageChange}
                style={{ display: 'none' }}
                id='image-input'
              />
              <label htmlFor='image-input'>
                <span className='cursor-pointer text-[#334693] font-semibold text-[1.2rem] '>
                  Selectionner une Image
                </span>
              </label>

              {image && <img src={image} alt='Selected' />} */}

              <button
                type="submit"
                className=" text-[1.2rem] py-2 font-medium rounded-md bg-[#334693] text-white"
              >
                {isEdict ? "Aufgabe bearbeiten" : "Aufgabe hinzufügen"}
              </button>
            </form>
          </div>
        )}
        {user && user.token && (
          <div className="rounded-md bg-slate-50 sdw-style">
            <div className="flex justify-center bg-[#6600af] font-semibold text-[1.2rem] text-white">
              <h2 className="p-2 ">Journal der Operationen</h2>
            </div>
            {operation.map((opera) => (
              <div className="p-3 space-y-2 rounded-md shadow-md">
                <div>
                  <div className="flex space-x-2 ">
                    <span className=" font-medium text-[1.1rem]">
                      Arten von Operationen:
                    </span>
                    <span>{opera.operation}</span>
                  </div>
                  <div className="flex space-x-2 ">
                    <span className=" font-medium text-[1.1rem]">Datum:</span>
                    <span>{convertDateFormat(opera.timestamp)}</span>
                  </div>
                  <div className="flex space-x-2 ">
                    <span className=" font-medium text-[1.1rem]">
                      Benutzer:
                    </span>
                    <span>{opera.user.username}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MainSection;
