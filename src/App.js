import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { useState, useEffect } from 'react';

function App() {
  const [list, setlist] = useState([])
  const [drop, setDrop] = useState([])
  const [drop2, setDrop2] = useState([])

  const getlist = async () => {
    await fetch('/db.json')
      .then((data) => {
        data.json()
          .then((result) => {
            setlist(result.items)
          })

      })
  }

  function getdroplist(id) {

    let item = list.find(sitem => sitem.id == id)

    setDrop(item.drop)    
  }
  function getdrop2list(d2id) {
    let item = drop.find(sitem => sitem.id == d2id)
    setDrop2(item.drop2)
  }

  useEffect(() => {
    getlist()
  }, [])
  return (
    <div className="App row">
      <div className="col-4">
        <ul id="menu">
          <li className="main"><a href=""> SHOPE BY CATEGORY</a>
            <ul className='sub'>
              {
                list?.map(data => (
                  <>
                    <li onMouseOver={() => getdroplist(data.id)} className="main"><a href="#">{data.title}</a>

                      <ul className="sub">
                        {
                          drop?.map(data => (
                            <>
                              <li onMouseOver={() => getdrop2list(data.id)} className="main"><a href="#">{data.name}</a>
                                <ul className="sub">
                                  {
                                   drop2?.map(data => (
                                      <>
                                        <li className="main"><a href="#">{data.value}</a></li>
                                      </>
                                    )
                                    )
                                  }
                                </ul>
                              </li>
                            </>
                          )
                          )}
                      </ul>
                    </li>
                 </>

               )
                )}
            </ul>
          </li>
        </ul>
      </div>
      <div className='offer   col-8 '>
       <h2><i class="fa-solid fa-tag "></i> &nbsp;OFFER</h2>
      </div>
    </div>
  );
}

export default App;
