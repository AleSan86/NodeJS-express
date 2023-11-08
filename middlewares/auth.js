export function isUser(req, res, next) {
  if (req.session?.user?.email) {
    return next();
  }
  return res.status(401).render('error', { error: 'error de autenticacion!' });
  }
  
  export function isAdmin(req, res, next) {
  if (req.session?.user?.isAdmin) {
    return next();
  }
  return res.status(403).render('error', { error: 'error de autorización!' });
  }

  export function getRole (req, res, next) {
    console.log(req.user);
    if(!req.user) return res.status(401).send({error: "Unauthorized"});
    if(!req.user.role!=role) return res.status(403).send({error: "No tiene permisos"});
    if(req.session.user.role == "admin") return next();
  }

  export const authorization = (role) => {
    return async(req, res, next) => {
      if(!req.user) return res.status(401).send({error: "Unauthorized"});
      if(!req.user.role!=role) return res.status(403).send({error: "No tiene permisos"});
      if(req.session.user.role == "admin") return next();
    }
  }