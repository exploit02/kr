import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'


export const Table = ({THead, TBody ={}, ActionButton={}, Pagination, Search })=>{
    console.log(TBody)
    const [input, setInputs] = useState('')
    const THeadLength = THead.length + 2
    const rowInPage = Pagination.entryInPage
    const currentPage = Pagination.pageNumber
    var hasData = false;

    useEffect(()=>{
        Pagination.handler(1, input)
    }, [input])

    if(Object.keys(TBody).length !== 0){
        var hasData = true
        var pageCount = Math.ceil(parseInt(TBody[0].count) / rowInPage)
        var paginationButton = [];
        for (let i = 1; i <= pageCount; i++) {
            i === currentPage ? 
            paginationButton.push(<li className="active"><a onClick={()=>Pagination.handler(i, input)}>{i}</a></li>) :
            paginationButton.push(<li className="waves-effect"><a onClick={()=>Pagination.handler(i, input)}>{i}</a></li>)
        }
    }
    
    return(
        <div>
            <div className="row">
                <div className="input-field col s7 row">
                <nav style={{backgroundColor:'white'}}>
                    <div class="nav-wrapper" >
                        <form>
                            <div class="input-field">
                                <input id="search" type="search" name="search" required value={input} onInput={e => setInputs(e.target.value)} />
                                <label class="label-icon active" for="search"><i class="material-icons">search</i></label>
                                <i class="material-icons">close</i>
                            </div>
                        </form>
                    </div>
                </nav>
                </div>
                <div className="input-field col s4 offset-s1">
                    <ul className="pagination" style={{float: 'right'}}>
                        {
                            hasData ? 
                            <li className ={ (currentPage === 1) ? "disabled" : "waves-effect"}><a onClick={()=>Pagination.handler(currentPage - 1)}><i className="material-icons">chevron_left</i></a></li> 
                            : 
                            null
                        }
                        {
                            paginationButton
                        }
                        {
                            hasData ? 
                            <li className={ (currentPage < pageCount) ? "waves-effect" : "disabled"}><a onClick={(currentPage < pageCount)? ()=>Pagination.handler(currentPage + 1):null}><i className="material-icons">chevron_right</i></a></li>
                            : 
                            null
                        }
                        
                    </ul>
                </div>
            </div>
            
            <div className="z-depth-2">
                <table className="responsive-table centered bordered">
                    <thead>
                        <tr>
                            {
                                THead.map((THcontent , index) => {
                                    return(
                                        <th>{THcontent}</th>
                                    )
                                })

                            }
                            {
                                Object.keys(ActionButton).length !== 0 ? <th>Action</th>:null
                            } 
                        </tr>
                    </thead>

                        {
                            
                            TBody.map((TBodyData , index) => {
                                var Column = Object.keys(TBodyData).map(function(key) {
                                    return TBodyData[key];
                                });

                                let adjustColumnWithHead = Column.slice(2, THeadLength).map((data) => data)

                                return (
                                    <tbody key = {index} className = {index}>
                                        <tr >
                                            {
                                                adjustColumnWithHead.map((ColumnData , index) => {
                                                    return(
                                                        <td>{ColumnData}</td>
                                                    )
                                                })
                                            }
                                            {
                                                (Object.keys(ActionButton).length !== 0) ?
                                                    <td>
                                                        {
                                                            Object.keys(ActionButton).map((Button) => {
                                                                const ButtonProperty = ActionButton[Button];
                                                                let ButtonHTML
                                                                if(ButtonProperty.Show && ButtonProperty.Link !== undefined && ButtonProperty.Link !== ''){
                                                                    
                                                                    ButtonHTML = 
                                                                        <Link 
                                                                            to={{pathname :ButtonProperty.Link,
                                                                            state: {Id:Column[ButtonProperty.StateColumn]}
                                                                            }}
                                                                            ><i className="material-icons">{ButtonProperty.ActiveIcon}</i>
                                                                        </Link>
                                                                        
                                                                
                                                                }else if(ButtonProperty.Show && ButtonProperty.Toggle === true){
                                                                ButtonHTML = 
                                                                    Column[ButtonProperty.BaseColumn] ? 
                                                                    <i className="material-icons" style={{cursor:'pointer'}} onClick={()=>ButtonProperty.HandlingFunction(Column[0])}>{ButtonProperty.ActiveIcon}</i>
                                                                    :
                                                                    <i className="material-icons" style={{cursor:'pointer'}} onClick={()=>ButtonProperty.HandlingFunction(Column[0])}>{ButtonProperty.InactiveIcon}</i>;
                                                                        
                                                                }else if(ButtonProperty.Show){
                                                                ButtonHTML = 
                                                                    Column[ButtonProperty.BaseColumn] ? 
                                                                    <i className="material-icons">{ButtonProperty.ActiveIcon}</i>
                                                                    :
                                                                    <i className="material-icons">{ButtonProperty.InactiveIcon}</i>
                                                                }
                                                                return(
                                                                    < >
                                                                    {ButtonHTML}
                                                                    {
                                                                        ButtonProperty.Separator ? 
                                                                        <i className="material-icons small">more_vert</i>
                                                                        :
                                                                        null
                                                                    }
                                                                    </>
                                                                )
                                                            })  
                                                        }
                                                    </td>
                                                :
                                                null
                                            }
                                        </tr>
                                    </tbody>
                                );
                            })
                        }
                    </table>
                </div>
            <div/>
        </div>
    )
}

