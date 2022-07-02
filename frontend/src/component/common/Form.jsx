import React from 'react'
import styles from './Form.module.css';
import LoadingSpinner from './LoadingSpinner';

const Form = ({ formData, buttonName, handleSubmit, isLoading }) => {
    return (
        <form onSubmit={handleSubmit} className={styles.form}>
            {formData.map((form) => {
                return (
                    <React.Fragment key={form.labelName}>
                        <label className={styles.formInputText} >{form.labelName} </label>
                        <input onChange={form.handler} className={styles.formInput} type={form.inputType} placeholder={`Enter Your ${form.labelName} ....`} />
                    </React.Fragment>
                )
            })}
            {isLoading ? <LoadingSpinner /> : <button className={styles.formSubmit} type='submit'>{buttonName}</button>}
        </form>

    )
}

export default Form