import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/User';
import Email from '../models/Email';
import { Console } from 'console';

interface IUser {
  ID_User: number;
  Name: string;
  ID_Rol: number;
  ID_Email: number;
  Imagen?: string;
  State: boolean;
  Password: string;
}

export const register = async (req:any, res:any) => {
  const { name, email, imagen, password } = req.body;
  
  try {
    const emailsearch = await Email.findOne({ where: { Description: email } });

    if (emailsearch) return res.status(400).json({ message: 'Correo ya existe' });

    const emailRecord = await Email.create({ Description: email, State: true });
    const id_email = emailRecord.dataValues.ID_Email;

    const hashedPassword = await bcrypt.hash(password, 10);
    const userRecord = await User.create({ Name:name, ID_Rol: 2,  ID_Email: id_email, Imagen:'vsdvsdv  ', Password: hashedPassword, State: true });

    res.status(201).json({ data: userRecord, message: 'Usuario registrado con éxito' });
  } catch (error) {
    res.status(500).json({ message: 'Error en el servidor' });
  }
};

export const login = async (req: any, res: any) => {
  const { email, password } = req.body;

  try {
    const emaildata = await Email.findOne({ where: { Description: email } }) as unknown as IUser;
    if (!emaildata) return res.status(404).json({ message: 'Usuario no encontrado' });

    const user = await User.findOne({ where: { ID_Email: emaildata.ID_Email } }) as unknown as IUser;
    const isValid = await bcrypt.compare(password, user.Password);
    if (!isValid) return res.status(401).json({ message: 'Contraseña incorrecta' });

    const token = jwt.sign({ ID_User: user.ID_User, Name: user.Name, ID_Rol: user.ID_Rol }, process.env.JWT_SECRET!, { expiresIn: '1d' });

    res.json({ token , message:  'Inicio de sesión exitoso'});
  } catch (error) {
    res.status(500).json({ message: 'Error al iniciar sesión' });
  }
};
