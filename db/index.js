 const sessions = {}
  
exports.getSession = (sessionId) => {
    const session = sessions[sessionId];
  
    return session && session.valid ? session : null;
  }
  
  exports.invalidateSession = (sessionId) => {
    const session = sessions[sessionId];
  
    if (session) {
      sessions[sessionId].valid = false;
    }
  
    return sessions[sessionId];
  }
  
  exports.createSession = (user) => {
    const sessionId = String(Object.keys(sessions).length + 1);
  
    const session = { sessionId, user, valid: true };
  
    sessions[sessionId] = session;
  
    return session;
  }
  