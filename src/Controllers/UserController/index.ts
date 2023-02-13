import { Request, Response } from "express";
import { User } from "../../Models/UserModel";
import bcrypt from 'bcrypt'

// Register a new user
export const createUserController = async (req: Request, res: Response) => {
  const {
    name,
    middleName,
    email,
    login,
    password,
    assignments,
    phone,
    role,
  } = req.body;

  // Validations
  if (!name) {
    return res.status(500).json({ status: false, message: "Nome é obrigatório!" })
  }
  if (!middleName) {
    return res.status(500).json({ status: false, message: "Sobrenome é obrigatório!" })
  }
  if (!email) {
    return res.status(500).json({ status: false, message: "E-mail é obrigatório!" })
  }
  if (!login) {
    return res.status(500).json({ status: false, message: "Login é obrigatório!" })
  }
  if (!password) {
    return res.status(500).json({ status: false, message: "Senha é obrigatória!" })
  }
  if (!assignments) {
    return res.status(500).json({ status: false, message: "Atribuição é obrigatório!" })
  }
  if (!role) {
    return res.status(500).json({ status: false, message: "Nome é obrigatório!" })
  }

  // Generate hash to password
  const salt = await bcrypt.genSalt(12);
  const passwordHash = await bcrypt.hash(password, salt)

  // Create object user
  const user = {
    name,
    middleName,
    email,
    login,
    password: passwordHash,
    assignments,
    phone,
    avatar: 'https://scontent.fbhz1-2.fna.fbcdn.net/v/t39.30808-6/290120577_4694839503950467_6351043653629336023_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=09cbfe&_nc_eui2=AeFZ5DNaFHUltL-OkUC7uookVuHjna8ioMFW4eOdryKgwfK3mEOwiEqQTHFm7kKMkRGXzmyS-kNJAZOYsG7qhHI5&_nc_ohc=aQBmVHHYu_oAX8EK1qM&_nc_ht=scontent.fbhz1-2.fna&oh=00_AfCiNr_pbnglm4QP-_FLBPMJLU82DRTAK2177oHW3Gp-qA&oe=63E4A80C',
    role,
  }

  try {
    // Check if user exists
    const checkIfUserExists = await User.findOne({login: login})

    if (checkIfUserExists) {
        return res.status(422).json({status: false, message: "Usuário já cadastrado no sistma!"})
    }

    await User.create(user);

    res.status(201).json({status: true, message: "Usuário cadastrado com sucesso!"})

  } catch (error) {
    res.status(500).json({ error: error });
  }
  
};

// Find all users registered on database
export const findAllUsersController = async (req: Request, res: Response) => {
    try {
        const users = await User.find();

        if (users.length === 0) {
            return res.status(404).json({status: false, message: "Não há usuários cadastrados no banco."})
        }

        return res.status(200).json({status: true, users});
    } catch (error) {
        res.status(500).json({ error: error });
    }
}

export const findOneUserController = async (req: Request, res: Response) => {
    const id = req.params.id;

    try {
        
        const user = await User.findOne({ _id: id })

        if (!user) {
            return res.status(404).json({status: false, message: "Usuário não encontrado!"})
        }

        res.status(200).json({status: true, user});

    } catch (error) {
        return res.status(404).json({status: false, message: "Usuário não encontrado!"})
    }
}

// Update user
export const updateUserController = async (req: Request, res: Response) => {
    const id = req.params.id;
    const {
        name,
        middleName,
        email,
        login,
        password,
        assignments,
        role,
        phone,
        avatar
    } = req.body;

    const salt = await bcrypt.genSalt(12);
  const passwordHash = await bcrypt.hash(password, salt);

    const user = {
        name,
        middleName,
        email,
        login,
        password: passwordHash,
        assignments,
        role,
        phone,
        avatar
    }

    try {
        const userUpdate = await User.updateOne({ _id: id }, user);
        if (userUpdate) {
            res.status(200).json({ status: true, message: "Usuário Atualizado com Sucesso!" });
            return;
        }
        res.status(200).json(userUpdate);
    } catch (error) {
        res.status(500).json({ error: error });
    }
}

// Delete user

export const deleteUserController = async (req: Request, res: Response) => {
    const _id = req.params.id;
    const user = await User.findOne({ _id });

    if (!user) {
        res.status(404).json({ error: "Usuário não encontrado!" });
        return;
    }

    try {
        await User.deleteOne({ _id });
        res.status(200).json({ status: true, message: "Usuário deletado com Sucesso!" });
      } catch (error) {
        res.status(500).json({ error: error });
    }
}