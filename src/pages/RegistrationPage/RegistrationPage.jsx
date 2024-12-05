import React from "react"
import '../RegistrationPage/RegistrationPage.scss'

const RegistrationPage = () =>{

    return(

        <div className="registration">

            <div className="registration-form">
                <h2>Cadastre-se</h2>
                <div className="registration-input">
                    <label htmlFor="name">Digite seu nome:</label>
                    <input type="text" name="name" required/>
                </div>

                <div className="registration-input">
                    <label htmlFor="email">Informe seu e-mail:</label>
                    <input type="email" name="email" required/>   
                </div>

                <div className="registration-input">
                    <label htmlFor="password">Crie uma senha:</label>
                    <input type="password" name="password" required/>   
                </div>

                <button type="submit">Concluir</button>
            </div>
 
        </div>
    )
}

export default RegistrationPage