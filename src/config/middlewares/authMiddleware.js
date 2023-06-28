// authMiddleware.js
const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    // Obtener el token del encabezado de la solicitud
    const token = req.header('Authorization');
    
    // Verificar si se proporcionó un token
    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }
    try {
        // Verificar y decodificar el token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        // Adjuntar el usuario decodificado a la solicitud
        req.user = decoded
        console.log(decoded)
        if(req.query.id != req.user.id) {
            return res.status(403).json({ message: 'Unauthorized' });
        }
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Invalid token' });
    }
};

module.exports = authMiddleware;
