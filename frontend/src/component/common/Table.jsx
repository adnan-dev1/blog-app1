import React from 'react'
import styles from './Table.module.css'

const Table = ({ headers, data, deleteHandler, keyContents }) => {
    return (
        <table className={styles.dataTable}>
            <thead>
                <tr>
                    {headers.map((header) => {
                        return (
                            <th key={header}>{ header }</th>
                        )
                    })}
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {data.map((item) => {
                    return <tr key={item._id}>
                        {keyContents.map((key) => {
                            return  <td key={key}>{item[key]}</td>
                        })}
                        <td>
                            <i onClick={() => deleteHandler(item._id)} className={`fa-solid fa-trash-can ${styles.deleteIcon}`}></i>
                        </td>
                    </tr>
                })}
            </tbody>
        </table>
    )
}

export default Table