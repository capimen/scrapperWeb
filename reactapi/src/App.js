import React, {useEffect, useState} from 'react'
import axios from 'axios'
import './App.css';

/**const urlbase = 'http://127.0.0.1:5000/' */
const urlbase = 'http://192.168.1.7:5000/'
const urlComparate = urlbase + 'comparator/'
const urlDelete = urlbase + 'product/'

function App() {
  
  const [comparators, setComparators] = useState()

  const onDelete =async (id, index)=>{
     await axios.delete(`${urlDelete}${id}`).then(() => {        
        comparators.splice(index,1)
        const newComparator = [...comparators]
        setComparators(newComparator)
      })
  }

   useEffect(() => {
    const fechApi = async () => {
      await axios.get(urlComparate).then((response) => {setComparators(response.data.comparatorList)})
    }
    fechApi()
   },[])

  return (
    <div className="App">
      <div className='divBookList'>
        <table className='bookList'>
          <thead className='bookListHeader'>
          <tr>
            <th>Titulo</th>
            <th>Precio Nuevo</th>
            <th>Precio Promedio</th>
            <th>Precio Más bajo</th>
            <th>Alerta Umbral</th>
            <th>Alerta Historico</th>
            <th>despublicar</th>
          </tr>
          </thead>
          <tbody>
          { !comparators ? 'Cargando...' : 
              comparators.map( (comparator,index)=>{ 
                return <tr key={comparator.id}>
                          {/* <td>{comparator.umbral_flag ? comparator.product_name : 
                          (comparator.best_historical_flag ? comparator.product_name : 
                          comparator.product_name)}</td>  */}
                          <td>
                            <a href={comparator.url}>
                              {(comparator.umbral_flag || comparator.best_historical_flag) && (comparator.price_newest !== 0)?                           
                                <b>{comparator.product_name}</b>: comparator.product_name}
                            </a>   
                          </td>
                          <td>
                            {comparator.price_newest === 0 ?
                              'sin stock' :  
                              comparator.price_newest}
                          </td> 
                          <td>
                            {comparator.price_average}
                          </td> 
                          <td>
                            {comparator.price_best}
                          </td>
                          <td>
                            {comparator.umbral_flag && comparator.price_newest !== 0 ? 
                              '🚨' : 
                              'No'}
                          </td>
                          <td>
                            {comparator.best_historical_flag && comparator.price_newest !== 0 ? '🚨' : 'No'}
                          </td>
                          <td onClick={()=>onDelete(comparator.id_product, index)}>
                            <p>🗑️</p>                            
                          </td></tr>
              })
            }
          </tbody>
        </table>
      </div>      
    </div>
  );
}

export default App;
