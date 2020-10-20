import React from 'react';
import './App.scss';

class App extends React.Component {
 state = {
  list: []
 }
 componentDidMount() {
   //...
   this.setState ({
     list: [
       {id: 1, number: 1, name: 'Item_1'},
       {id: 2, number: 2, name: 'Item_2'},
       {id: 3, number: 3, name: 'Item_3'},
       {id: 4, number: 4, name: 'Item_4'},
       {id: 5, number: 5, name: 'Item_5'},
       {id: 6, number: 6, name: 'Item_6'}
     ]
   })
 }

sorting = () => {
  this.setState({
    list: this.state.list.reverse()
  })
}

 render() {
   const { list } = this.state;
   return (
     <div className='container'>
       <p>List</p>
       <ul className='list-group'>
         {list.map(listItem => (
           <li className='list-item' key={listItem.id}>{listItem.number}. {listItem.name}</li>
         ))}
       </ul>
       <button 
        className='sortBtn'
        onClick={() => this.sorting()}
        >Sorting</button>
     </div>
   )
 }
}

export default App;