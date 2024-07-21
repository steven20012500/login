const Usuario = require('../models/usuarios');
const jwt = require('jsonwebtoken');

const usuariosController = {};

usuariosController.getUsuarios = async (req, res) => {
    try {
        const usuarios = await Usuario.find();
        res.json(usuarios);
      } catch (err) {
        res.status(500).send(err);  
      }
}


usuariosController.login = async (req, res) => {
  const { username, password } = req.body;
  const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;
  console.log('accessTokenSecret:', accessTokenSecret);
try {
  const usuario = await Usuario.findOne({ username });
    if (!usuario) {
        return res.status(401).send("El correo no existe");
    }
    if (usuario.password !== password) {
        return res.status(401).send("Contraseña incorrecta");
    }
    const token = jwt.sign({ _id: usuario._id, role: usuario.role }, accessTokenSecret);
    return res.status(200).json({ token });

} catch (error) {
    console.error('Error en el login:', error);
    return res.status(500).json({ message: 'Error interno en el servidor' });
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
  const { username, oldPassword, newPassword } = req.body;

  try {
    const usuario = await Usuario.findOne({ username });
    if (!usuario) {
      return res.status(400).json({ msg: 'Usuario no encontrado' });
    }

    // Comparar la contraseña actual sin bcrypt
    if (usuario.password !== oldPassword) {
      return res.status(400).json({ msg: 'Contraseña actual incorrecta' });
    }

    // Actualizar la contraseña con la nueva
    usuario.password = newPassword;
    await usuario.save();

    res.json({ msg: 'Contraseña actualizada exitosamente' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
} 
usuariosController.deleteUsuario = async (req, res) => {
  const { username } = req.params;

  try {
    const usuario = await Usuario.findOneAndDelete({ username });
    if (!usuario) {
      return res.status(404).json({ msg: 'Usuario no encontrado' });
    }
    res.json({ msg: 'Usuario eliminado exitosamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error interno en el servidor', error: error.message });
  }
};

usuariosController.updateUsuario = async (req, res) => {
  const { username } = req.params;
  const { newPassword, role } = req.body;

  try {
    const usuario = await Usuario.findOne({ username });
    if (!usuario) {
      return res.status(404).json({ msg: 'Usuario no encontrado' });
    }

    // Actualiza el password si se proporciona uno nuevo
    if (newPassword) {
      usuario.password = newPassword; // Asegúrate de encriptar la contraseña antes de guardar
    }

    if (role) {
      usuario.role = role;
    }

    await usuario.save();

    res.json({ msg: 'Usuario actualizado exitosamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error interno en el servidor', error: error.message });
  }
};

usuariosController.getUserByUsername = async (req, res) => {
  const { username } = req.params;

  try {
    const usuario = await Usuario.findOne({ username });
    if (!usuario) {
      return res.status(404).json({ msg: 'Usuario no encontrado' });
    }
    res.json(usuario);
  } catch (error) {
    res.status(500).json({ message: 'Error interno en el servidor', error: error.message });
  }
};

module.exports = usuariosController;

