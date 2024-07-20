const Usuario = require('../models/usuarios');

const usuariosController = {};

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

module.exports = usuariosController;

