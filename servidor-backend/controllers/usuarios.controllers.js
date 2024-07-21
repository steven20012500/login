const Usuario = require('../models/usuarios');
const bcrypt = require('bcryptjs');


const usuariosController = {};

usuariosController.getUsuarios = async (req, res) => {
    try {
        const usuarios = await Usuario.find();
        res.json(usuarios);
      } catch (err) {
        res.status(500).send(err);  
      }
}

usuariosController.addUsuario = async (req, res) => {
    const { username, password, role } = req.body;

    if (!username || !password || !role) {
        return res.status(400).send('Faltan campos obligatorios');
      }
    
      if (!/^[a-zA-Z0-9._%+-]+@ups\.edu\.ec$/.test(username)) {
        return res.status(400).send('El correo debe tener el dominio ups.edu.ec');
      }
    
      if (password.length < 6 || !/\d/.test(password) || !/[a-zA-Z]/.test(password)) {
        return res.status(400).send('La contraseña debe tener al menos 6 caracteres y contener letras y números');
      }
    
      try {
        const newUser = new Usuario({ username, password, role });
        await newUser.save();
        res.json({
          message: 'Usuario creado exitosamente',
          user: newUser
        });
      } catch (err) {
        res.status(500).send(err);
      }
}

usuariosController.updatePassword = async (req, res) => {
  try {
    const { username, oldPassword, newPassword } = req.body;
    const user = await Usuario.findOne({ username });
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }
    const isMatch = await user.comparePassword(oldPassword);
    if (!isMatch) {
      return res.status(400).json({ message: 'Contraseña antigua incorrecta' });
    }
    user.password = newPassword;
    await user.save();
    res.status(200).json({ message: 'Contraseña cambiada exitosamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error al cambiar la contraseña', error });
  }
  
}

module.exports = usuariosController;

