FROM atendai/evolution-api

# Railway expõe a variável PORT, vamos configurá-la na aplicação.
# EvolutionAPI por padrão escuta na porta 8080, mas ajustamos para usar a porta do Railway.
ENV PORT=${PORT:-8080}

# Defina a chave de autenticação a partir da variável de ambiente do Railway
ENV AUTHENTICATION_API_KEY=${AUTHENTICATION_API_KEY:-mude-me}

# Exponha a porta
EXPOSE ${PORT:-8080}

# Comando padrão do container
CMD ["npm", "start"]
