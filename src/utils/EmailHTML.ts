const bodyMail = (code:string, expirationDate: string) =>{
    return    `<html>
                    <head>
                        <style>
                            * {
                                padding: 0;
                                margin: 0;
                                font-family: Arial, Helvetica, sans-serif;
                            }
                            .header {
                                text-align: center;
                                margin: auto;
                                height: fit-content;
                                background-color: #33B9D4;
                                color: white;
                                font-size: 52px;
                                padding: 15px;
                            }

                            p {
                                font-size: 22px;
                                text-align: justify;
                            }

                            .message {
                                padding: 15px;
                            }

                            .textCode {
                                font-size: 32px;
                            }

                            .footer {
                                font-size: 15px;
                            }
                        </style>
                    </head>
                    <body>
                        <div class="header">
                            <h1>Get MagiCode</h1>
                        </div>
                        <div class="message">
                            <p>Olá! Somos da equipe do aplicativo <b>Get MagiCode</b>.</p>
                            </br>
                            <p>Foi solicitada a recuperação de senha da sua conta. Cole o código enviado nesse email e altere a sua senha.</p>
                            <br/>
                            <p class="textCode">Código: <b>${code}</b></p>
                            <br/>
                            <p>Data de expiração: ${expirationDate}</p>
                            <br/>
                            <p>Esse código irá expirar em 24h, após isso será necessário solicitar a recuperação novamente. </p>
                            </br></br>

                            <p><b>ATENÇÃO:</b> Caso não tenha feito essa requisição, por favor, ignore essa mensagem.</p>
                        </div>
                    </body>
                </html>`
}

export default bodyMail;
