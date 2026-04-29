import jwt from "jsonwebtoken";

export const requireAuth = (req, res, next) => {    
    const header = req.headers.authorization;   
      if (!header || !header.startsWith("Bearer ")) 
      {
        const error = new Error("Unauthorized: Token missing");
        error.status = 401;
        return next(error);
      }     
      const token = header.split(" ")[1];   
        try {   
            const decoded = jwt.verify(token, process.env.JWT_SECRET);  
            req.user = decoded; // Attach user info to request object //userid, email, role
            next();
        }catch {
            const err = new Error("Unauthorized:Token Missing ");
            err.status = 401;
            next(err);
        }
    };
