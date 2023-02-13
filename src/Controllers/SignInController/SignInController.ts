import { Request, Response } from "express";
import { User } from "../../Models/UserModel";
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import axios from "axios";
import { sendMail } from "../../Messages/email";

export const signInController = async (req: Request, res: Response) => {
    const { login, password } = req.body;

    if (!login) {
        return res.status(422).json({ msg: "Insira ao menos um login!" });
      }
    
      if (!password) {
        return res.status(422).json({ msg: "Insira ao menos uma Senha!" });
      }
      
      try {
             // Check if user exists
        const user = await User.findOne({ login: login }); // verify username

        if (!user) {
            return res.status(404).json({ msg: "Usuário não encontrado!" });
        }

        // Check if password match
        const checkPass = await bcrypt.compare(password, user.password);

        if (!checkPass) {
            return res.status(422).json({ msg: "Senha inválida!" });
        }

        // Create token
         const token = jwt.sign({
          id: user._id,
         }, process.env.SECRET as string, {
           expiresIn: "2h" 
         })

        // save user token
         user.token = token;

        // return new user
        res.status(200).json({status: true, message: "Authenticated!", user});
      } catch (error) {
    res
      .status(500)
      .json({ msg: "Erro com o servidor, tente novamente mais tarde!" });
  }
}

export const forgetPasswordController = async (req: Request, res: Response) => {
   const { login, email } = req.body;

   if (!login) { 
    return res.status(422).json({ msg: "Insira ao menos um login!" });
   }
   if (!email) {
    return res.status(422).json({ msg: "Insira ao menos um email!" });
   }

   try {
      const user = await User.findOne({ login: login }); // verify username

        if (!user) {
            return res.status(404).json({ msg: "Usuário não encontrado!" });
        }
      const checkEmail = await User.findOne({ email: email }); // verify username

        if (!checkEmail) {
            return res.status(404).json({ msg: "E-mail inválido!" });
        }
 
        let numbers = generateRandomNumber(10);

        const { data } = await axios.patch(`http://localhost:3333/api/update-user/${user._id}`, {
          name: user.name,
          middleName: user.middleName,
          email: user.email,
          login: user.login,
          password: `${numbers}`,
          assignments: user.assignments,
          phone: user.phone,
          role: user.role
        })

        let message = '';
        let to = [user.email]
        let html = `
        <html>
        <body>
            <h1>${user.name}&nbsp;${user.middleName}</h1>
            <h2>Senha atualizada com sucesso.</h2>
            <!--  <p>
                Essa é sua nova senha <strong>${numbers}</strong>
              </p> -->
              <a href="http://localhost:3000/update-pass/${user._id}">Redefina sua senha aqui</a>
              <p>
                Por favor, alterar sua senha após efetuar o login.
              </p>
            <br/>
            Att,<br/>
            #TIMEDETI 
        </body>
      </html>
        `;
        sendMail(message, to, html)
        res.status(200).json({status: true, message: "Uma nova senha foi cadastrada e enviada para o seu e-mail."})
        return data;
   } catch (error) {
      res.status(500)
      .json({ msg: "Erro com o servidor, tente novamente mais tarde!" });
    }
}

function generateRandomNumber(length: number) {
  let result = "";
  let characters = "0123456789";
  let charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}
